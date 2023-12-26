import { Launch } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { Announcement } from './announcement';

export interface BasicAnnouncementProps {
	title: string;
	description: string;
	button?: {
		url: string;
		external: boolean;
		label: string;
	};
}

export const BasicAnnouncement: React.FC<BasicAnnouncementProps> = ({ title, description, button }) => (
	<Announcement>
		<Typography variant='h3' color='neutral.lightest'>{title}</Typography>
		<Typography variant='body1' color='neutral.lightest'>{description}</Typography>
		{button && (
			<Box sx={{ marginTop: 1 }}>
				{button.external ? (
					<Link
						key={button.url}
						href={button.url}
						target='_blank'
						sx={{
							display: 'grid',
							alignItems: 'center',
							gap: 1,
							justifyContent: 'start',
							gridAutoFlow: 'column',
						}}
						color='text.primary'
					>
						<span>{button.label}</span>
						<Launch />
					</Link>
				) : (
					<Link key={button.url} href={button.url} color='text.primary'>
						{button.label}
					</Link>
				)}
			</Box>
		)}
	</Announcement>
);
