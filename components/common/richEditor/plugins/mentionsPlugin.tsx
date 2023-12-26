import { Box, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import { BeautifulMentionsMenuItemProps, BeautifulMentionsMenuProps, BeautifulMentionsPlugin } from 'lexical-beautiful-mentions';
import React, { forwardRef, useMemo } from 'react';

export type MentionsPluginProps = {
	triggers?: string[];
	onSearch?: (trigger: string, query?: string | null) => Promise<string[]>;
};

const MentionsPlugin: React.FC<MentionsPluginProps> = ({ triggers, onSearch }) => (
	<BeautifulMentionsPlugin
		triggers={triggers ?? []}
		onSearch={onSearch ?? (() => new Promise(r => {
			r([]);
		}))}
		menuComponent={MentionsMenu}
		menuItemComponent={MentionsMenuItem}
	/>
);

const MentionsMenu = forwardRef<HTMLUListElement, BeautifulMentionsMenuProps>(({ loading, ...props }, ref) => {
	console.log({ loading, props });
	return (
		<Box>
			<Box sx={{}}>&nbsp;</Box>
			{loading ? (
				<Box
					sx={{
						bgcolor: 'background.paper',
						boxShadow: 1,
						borderRadius: 4,
						height: 100,
						width: 100,
					}}
				>
					<Skeleton />
				</Box>
			) : (
				<List {...props} ref={ref} sx={{ bgcolor: 'background.paper', boxShadow: 1, borderRadius: 4 }} />
			)}
		</Box>
	);
});
MentionsMenu.displayName = 'MentionsMenu';

const MentionsMenuItem = forwardRef<HTMLLIElement, BeautifulMentionsMenuItemProps>(({ children, ...props }, ref) => {
	const text = useMemo(() => `${children}`, [children]);

	return (
		<ListItem {...props} ref={ref}>
			<ListItemText primary={text} />
		</ListItem>
	);
});
MentionsMenuItem.displayName = 'MentionsMenuItem';

export default MentionsPlugin;
