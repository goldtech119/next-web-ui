'use client';

import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ToastContextType = {
	showToast: ShowToastFunction;
};

type ShowToastFunction = (text: string | { title?: string; message: string; action?: React.ReactNode }, severity?: AlertColor) => void;

type ToastMessage = {
	key: number;
	message: string;
	title?: string;
	action?: React.ReactNode;
	severity: AlertColor;
};

const ToastContext = createContext<ToastContextType>({
	showToast: () => console.error('Not Implemented'),
});

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [show, setShow] = useState<boolean>(false);
	const [queue, setQueue] = useState<readonly ToastMessage[]>([]);
	const [activeToast, setActiveToast] = useState<ToastMessage | undefined>(undefined);

	useEffect(() => {
		if (queue.length > 0 && !activeToast) {
			setActiveToast({ ...queue[0] });
			setQueue(prev => prev.slice(1));
			setShow(true);
		} else if (queue.length > 0 && activeToast && show) {
			// Close active message when a new one is created
			setShow(false);
		}
	}, [queue, activeToast, show]);

	const showToast: ShowToastFunction = useCallback((text, severity = 'info') => {
		if (typeof text === 'string') {
			setQueue(prev => [...prev, { message: text, severity, key: new Date().getTime() }]);
		} else {
			setQueue(prev => [...prev, { ...text, severity, key: new Date().getTime() }]);
		}
	}, []);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setShow(false);
	};

	const handleExited = () => {
		setActiveToast(undefined);
	};

	const value: ToastContextType = useMemo(() => ({ showToast }), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			<Snackbar
				key={activeToast ? activeToast.key : undefined}
				open={show}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<Alert onClose={handleClose} severity={activeToast?.severity} action={activeToast?.action}>
					{activeToast?.title && <AlertTitle>{activeToast.title}</AlertTitle>}
					{activeToast?.message}
				</Alert>
			</Snackbar>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);

	if (context === undefined) {
		throw new Error('useToast must be called from ToastContext');
	}

	return context;
};
