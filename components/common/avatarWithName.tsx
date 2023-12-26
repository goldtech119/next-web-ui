import { routes } from '#helpers/routes';
import { User } from '#types/dyno/User';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';

export type AvatarWithNameProps = {
	user: Pick<User, 'id' | 'username' | 'avatar' | 'discriminator'> | undefined;
};

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({ user }) => user ? (
	<CardHeader
		avatar={
			<Avatar alt={`${user.username} avatar`} src={routes.discordAvatar(user.id, user.avatar)}>
				<Avatar src={routes.discordAvatarFallback(user.discriminator)} />
			</Avatar>
		}
		title={`${user.username}#${user.discriminator}`}
		sx={{ padding: 0 }}
	/>
) : null;
