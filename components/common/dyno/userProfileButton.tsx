import { useAuth } from '#components/contexts/authContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export type UserProfileButtonProps = {
	onClickOverride?: () => void;
	hideLogout?: boolean;
};

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({ onClickOverride, hideLogout }) => {
	const router = useRouter();
	const { user } = useAuth();
	const onClick = useCallback(() => {
		if (onClickOverride) {
			onClickOverride();
			return;
		}

		return router.push('/manage');
	}, [onClickOverride, router]);
	const handleLogout = useCallback(() => {
		console.error('Not Implemented');
	}, []);

	return (
		<Box
			sx={{
				display: 'grid',
				gridAutoFlow: 'column',
				alignItems: 'center',
				gap: 1,
			}}
		>
			<Button
				variant='outlined'
				startIcon={
					<Box
						sx={{
							borderRadius: '50%',
							overflow: 'hidden',
							height: 32,
							width: 32,
						}}
					>
						<Image src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt='Profile image' height='32' width='32' />
					</Box>
				}
				onClick={onClick}
			>
				{user?.username}
			</Button>
			<IconButton sx={{ height: 32, width: 32 }} onClick={handleLogout}>
				<LogoutOutlinedIcon />
			</IconButton>
		</Box>
	);
};
