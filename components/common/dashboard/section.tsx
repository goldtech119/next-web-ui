'use client';

import { ChevronRightRounded } from '@mui/icons-material';
import { Box, Collapse, SxProps, Theme, Typography } from '@mui/material';
import React, { Children, useCallback, useMemo, useState } from 'react';
import { PremiumBadge } from '../badge/premium';

interface DashboardSectionProps extends React.PropsWithChildren {
	title?: string;
	description?: string;
	premium?: boolean;
	sx?: SxProps<Theme>;
	subsection?: boolean;
	vertical?: boolean;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ title, description, premium, children, subsection, vertical, sx }) => {
	const childrenArray = useMemo(() => Children.toArray(children), [children]);
	const [isOpen, _setIsOpen] = useState(false);
	const toggleIsOpen = useCallback(() => _setIsOpen(x => !x), []);

	const Title = () => title ? (
		<Box
			sx={{
				display: subsection ? 'grid' : undefined,
				gridTemplateColumns: subsection ? '1fr max-content' : undefined,
				justifyContent: subsection ? 'space-between' : undefined,
				alignItems: subsection ? 'center' : undefined,
				cursor: subsection ? 'pointer' : undefined,
			}}
			onClick={subsection ? toggleIsOpen : undefined}
		>
			<Typography fontSize={24} color='neutral.lightest'>
				{title}
			</Typography>
			{subsection && <ChevronRightRounded sx={{ rotate: isOpen ? '90deg' : 0 }} />}
		</Box>
	) : null;
	const Description = () =>
		description ? (
			<Typography fontSize={16} color='neutral.dark' marginTop={2}>
				{description}
			</Typography>
		) : (
			<div></div>
		);
	const Badge = () => premium && <PremiumBadge sx={{ marginBottom: 2 }} />;

	return (
		<Box
			className='dashboard-section'
			sx={{
				background: t => (subsection ? undefined : t.palette.neutral.main),
				borderRadius: subsection ? undefined : 2.5,
				padding: childrenArray.length === 1 && !subsection ? 3 : undefined,
				...sx,
			}}
		>
			{childrenArray.length === 1 || subsection ? (
				<>
					<Badge />
					<Title />
					<Description />
					{subsection ? (
						<Collapse in={isOpen}>
							<Box sx={{ paddingTop: title || description ? 3 : undefined }}>{children}</Box>
						</Collapse>
					) : (
						<Box sx={{ marginTop: title || description ? 4 : undefined }}>{children}</Box>
					)}
				</>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridAutoFlow: { xs: 'row', md: vertical ? undefined : 'column' },
						gridAutoColumns: '1fr',
					}}
				>
				<Box
						sx={{
							padding: 3,
							display: 'grid',
							gridTemplateRows: 'max-content 1fr',
						}}
					>
						<Box sx={{ paddingBottom: title || description ? 4 : undefined }}>
							<Badge />
							<Title />
							<Description />
						</Box>
						<Box>{childrenArray[0]}</Box>
					</Box>
					<Box
						sx={{
							borderLeft: vertical ? undefined : t => `1px solid ${t.palette.divider}`,
							borderTop: vertical ? t => `1px solid ${t.palette.divider}` : undefined,
							padding: 3,
						}}
					>
						{childrenArray[1]}
					</Box>
				</Box>
			)}
		</Box>
	);
};

interface ModuleSectionProps extends React.PropsWithChildren {

}

export const ModuleSection: React.FC<ModuleSectionProps> = ({ children }) => {
	const childrenArray = useMemo(() => Children.toArray(children), [children]);
	return (
		<Box 
			sx={{
				mt: 4,
				background: t => t.palette.neutral.main,
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<Box 
				sx={{ 
					width: 356,
					px: 4,
					py: 8
				}}
			>
				{childrenArray[0]}
			</Box>
			<Box
				sx={{
					flex: '1',
					px: 4,
					py: 8,
					borderLeft: t => `1px solid ${t.palette.neutral.darker}`
				}}
			>
				{childrenArray[1]}
			</Box>
		</Box>
	);
}