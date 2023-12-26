import { Button } from '#components/common/button/button';

import { HighlightOff } from '@mui/icons-material';
import {
	Box,
	SxProps,
	Theme,
	Typography,
	useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React, {
	FC,
	JSXElementConstructor,
	ReactElement,
	useReducer,
} from 'react';

interface ThresholdItem {
  id: string;
  permanent?: boolean;
  channelId: string;
  followingChannelId: string;
  threshold?: number;
  emoji?: string;
}

interface ThresholdState {
  items: Partial<ThresholdItem>[];
}

type Actions =
  | { type: 'add' }
  | { type: 'delete'; id: number }
  | { type: 'change'; payload: ThresholdItem };

function thresholdsReducer(state: ThresholdState, action: Actions) {
	switch (action.type) {
		case 'add': {
			const items = [
				...state.items,
				createDefaultThrehold(state.items.length + 1),
			];
			return { items };
		}

		case 'change': {
			const items = state.items.map(threshold => {
				if (threshold.id === action.payload.id) {
					return { ...threshold, ...action.payload };
				}

				return threshold;
			});
			return { items };
		}

		case 'delete': {
			const items = state.items.filter(
				threshold => threshold.id !== action.id.toString(),
			);
			return { items };
		}

		default: {
			return state;
		}
	}
}

export const defaultThreshold: Partial<ThresholdItem> = {
	id: '1',
	permanent: true,
	channelId: '',
	followingChannelId: '',
};

interface ColumnOpts {
  label: string;
  name: string;
  sx?: SxProps<Theme>;
  renderInput: (
    _props: ThresholdItem,
    _columnOpts?: ColumnOpts
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
}

interface CustomThresholdsProps {
  title: string;
  label: string;
  defaultState: ThresholdState;
  columnsConfig: ColumnOpts[];
}

export const CustomThresholds: FC<CustomThresholdsProps> = ({
	defaultState,
	columnsConfig,
	title,
	label,
}) => {
	const t = useTranslations();
	const theme = useTheme();
	const [thresholds, dispatch] = useReducer(thresholdsReducer, defaultState);

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.neutral.main,
				padding: '2.25rem',
				borderRadius: '1.25rem',
				marginTop: '1rem',
			}}
		>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}
			>
				<Typography fontSize={24} color={theme.palette.neutral.lightest}>
					{title}
				</Typography>
				<Typography fontSize={12} color={theme.palette.neutral.light}>
					{label}
				</Typography>
			</Box>
			<Box>
				<Box
					sx={{
						backgroundColor: theme.palette.neutral.darkest,
						width: 'min-content',
						paddingX: '1.5rem',
						paddingY: '2rem',
						borderRadius: '1.25rem',
						marginTop: '1rem',
					}}
				>
					<Box sx={{ display: 'flex', mb: 1 }}>
						{columnsConfig.map(column => (
							<Box key={column.label} sx={column.sx}>
								<Typography
									fontWeight={600}
									fontSize={12}
									color={theme.palette.neutral.lightest}
								>
									{column.label}
								</Typography>
							</Box>
						))}
					</Box>
					{thresholds.items.map((threshold, idx) => {
						const isLast = thresholds.items.length === idx + 1;
						return (
							<Box
								key={threshold.id}
								sx={{ display: 'flex', mb: isLast ? 0 : '1.5rem' }}
							>
								{columnsConfig.map(column => (
									<Box key={column.label} sx={column.sx}>
										{React.cloneElement(
											column.renderInput(threshold as ThresholdItem, column),
											{ name: `${column.name}-${idx}` },
										)}
									</Box>
								))}
								<Box
									sx={{
										display: 'grid',
										placeItems: 'center',
										padding: '1rem',
										ml: 1,
									}}
								>
									<HighlightOff
										htmlColor={'#D84C10'}
										sx={{ cursor: 'pointer' }}
										onClick={() => {
											dispatch({ type: 'delete', id: Number(threshold.id) });
										}}
									/>
								</Box>
							</Box>
						);
					})}
				</Box>
				<Button
					buttonType='other'
					sx={{ fontSize: 12, mt: 2, borderRadius: '6px', py: '4px' }}
					onClick={() => {
						dispatch({ type: 'add' });
					}}
				>
					{t('form.CustomThreshold.button')}
				</Button>
			</Box>
		</Box>
	);
};

export function createDefaultThrehold(id: number): Partial<ThresholdItem> {
	return { ...defaultThreshold, id: id.toString(), permanent: false };
}
