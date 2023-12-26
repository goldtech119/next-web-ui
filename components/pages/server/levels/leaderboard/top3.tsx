import { GuildLevel } from '#types/dyno/GuildLevel';
import { Box } from '@mui/system';
import React from 'react';
import { Top3Item } from './top3Item';

export type Top3Props = {
  items: GuildLevel[];
};

export const Top3: React.FC<Top3Props> = ({ items }) => (
	<Box
		sx={{
			display: 'grid',
			gridAutoFlow: { xs: 'row', md: 'column' },
			gap: 6,
			width: 'fit-content',
			maxWidth: 800,
			mx: 'auto',
			mb: 8,
		}}
	>
		<Top3Item item={items[0]} position={1} />
		<Top3Item item={items[1]} position={2} />
		<Top3Item item={items[2]} position={3} />
	</Box>
);
