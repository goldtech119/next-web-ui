import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import React, { useCallback, useState } from 'react';

export type ModalProps = {
  modal: UseModalHookReturn;
  title: React.ReactNode;
  hideModalX?: boolean;
  hideDivider?: boolean;
} & React.PropsWithChildren;

export const Modal: React.FC<ModalProps> = (
	{ children, title, hideModalX, modal: { isOpen, close }, hideDivider },
) => (
	<Dialog open={isOpen} onClose={close}>
		<DialogTitle>
			{title}
			{!hideModalX && (
				<IconButton
					aria-label='close'
					onClick={close}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			)}
		</DialogTitle>
		{hideDivider ? null : <Divider />}
		<Box
			sx={{
				paddingTop: 2,
				paddingBottom: 2,
				paddingLeft: 3,
				paddingRight: 3,
			}}
		>
			{children}
		</Box>
	</Dialog>
);

type UseModalOptions = { renderOnLoad?: boolean };
export type UseModalHookReturn = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
};
type UseModalHook = (options: UseModalOptions) => UseModalHookReturn;

export const useModal: UseModalHook = ({ renderOnLoad }) => {
	const [isOpen, setIsOpen] = useState(Boolean(renderOnLoad));
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen(o => !o), []);

	return { isOpen, open, close, toggle };
};
