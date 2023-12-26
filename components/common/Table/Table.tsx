import { Delete, Edit } from '@mui/icons-material';
import { Box, Theme, styled, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableMui from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import { LexendFont } from 'misc/fonts';
import { ComponentProps } from 'react';

interface Value {
  headerName: string;
  value: string | number;
  cellProps?: TableCellProps;
}

export interface RowConfig {
  id: string;
  options: Value[];
  onDelete?: (_id: string) => void;
  onEdit?: (_id: string) => void;
}

export interface TableProps {
  headers: string[];
  rows: RowConfig[];
  enableActions?: boolean;
  tProps?: ComponentProps<typeof TableMui>;
  tRowProps?: TableRowProps;
  tHeadCellProps?: TableCellProps;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	backgroundColor: theme.palette.neutral.darker,
	borderBottom: `1px solid ${theme.palette.neutral.dark}`,
	'&:last-child': {
		border: 'none',
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	padding: '.75rem 1rem',
	fontFamily: LexendFont.style.fontFamily,
	backgroundColor: theme.palette.neutral.darker,
	color: theme.palette.neutral.light,
	border: 'none',
}));

const BoxIcon = styled(Box)(({ theme }) => ({
	display: 'grid',
	placeItems: 'center',
	padding: '8px 16px',
	borderRadius: '4px',
	cursor: 'pointer',
	border: `2px solid ${theme.palette.neutral.light}`,
}));

const getActionIcon = (t: Theme, onClick: () => void) => ({
	edit: (
		<BoxIcon>
			<Edit
				sx={{ width: '20px', height: '20px' }}
				htmlColor={t.palette.neutral.dark}
				onClick={onClick}
			/>
		</BoxIcon>
	),
	delete: (
		<BoxIcon>
			<Delete
				sx={{ width: '20px', height: '20px' }}
				htmlColor={t.palette.neutral.dark}
				onClick={onClick}
			/>
		</BoxIcon>
	),
});

export function Table(props: TableProps) {
	const { headers, rows, tProps, tHeadCellProps, tRowProps, enableActions = true } = props;
	const theme = useTheme();

	return (
		<TableContainer
			sx={{ borderRadius: '.75rem', overflow: 'hidden' }}
			component={Paper}
		>
			<TableMui {...tProps}>
				<TableHead>
					<StyledTableRow sx={theme => ({
						'&:last-child': {
							borderBottom: `1px solid ${theme.palette.neutral.dark}`,
						},
					})}>
						{headers.map(header => (
							<StyledTableCell key={header} {...tHeadCellProps}>
								{header}
							</StyledTableCell>
						))}
						{enableActions && <StyledTableCell />}
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<StyledTableRow key={row.id} {...tRowProps}>
							{row.options.map(option => (
								<StyledTableCell
									key={`${row.id}-${option.headerName}`}
									{...option.cellProps}
								>
									{option.value}
								</StyledTableCell>
							))}
							{enableActions && (
								<TableCell sx={{ display: 'flex', columnGap: '.5rem', border: 'none', justifyContent: 'flex-end' }}>
									{row.onEdit && getActionIcon(theme, () => row.onEdit?.(row.id)).edit}
									{row.onDelete && getActionIcon(theme, () => row.onDelete?.(row.id)).delete}
								</TableCell>
							)}
						</StyledTableRow>
					))}
				</TableBody>
			</TableMui>
		</TableContainer>
	);
}
