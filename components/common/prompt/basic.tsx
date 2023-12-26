/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import React, { useCallback } from 'react';

import Button from '../button';

export interface BasicPromptProps {
  title?: string;
  text: string;
  closeButtonText?: string;
  disableAutoFocusCloseButton?: boolean;
  onClose?: () => void;
  additionalButtons?: {
    closeOnClick: boolean;
    text: string;
    onClick?: () => void;
  }[];
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const BasicPrompt: React.FC<BasicPromptProps> = ({
	title,
	text,
	onClose,
	additionalButtons,
	disableAutoFocusCloseButton,
	open,
	setOpen,
}) => {
	const handleClose = useCallback(() => {
		setOpen(false);
		onClose?.();
	}, [onClose, setOpen]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			{title && <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>}
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus={!disableAutoFocusCloseButton}>
          Okay
				</Button>
				{additionalButtons
          && additionalButtons.map(b => (
          	<Button
          		key={b.text}
          		onClick={
          			b.closeOnClick
          				? () => {
          					handleClose();
          					b.onClick?.();
          				}
          				: b.onClick
          		}
          	>
          		{b.text}
          	</Button>
          ))}
			</DialogActions>
		</Dialog>
	);
};
