import { routes } from '#helpers/routes';
import { User } from '#types/dyno/User';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import React from 'react';

export type DiscordAvatarProps = {
	user?: User;
};

export const DiscordAvatar: React.FC<DiscordAvatarProps & AvatarProps> = ({ user, ...props }) => user ? (
	<Avatar {...props} alt={`${user?.username} avatar`} src={routes.discordAvatar(user.id, user.avatar)}>
		<Avatar {...props} alt={`${user?.username} avatar`} src={routes.discordAvatarFallback(user?.discriminator)} />
	</Avatar>
) : (
	<Avatar {...props} alt='avatar' src={routes.discordAvatarFallback()} />
);
