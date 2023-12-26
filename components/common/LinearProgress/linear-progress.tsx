import { useEffect, useState } from 'react';
import { Box, LinearProgress as LinearProgressMui, Typography, linearProgressClasses, styled } from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import { useTranslations } from 'next-intl';

type LinearDeterminateProps = {
	createdAt: string;
	nextPost: string;
};

const BorderLinearProgress = styled(LinearProgressMui)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	width: '100%',
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.neutral.lightest,
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.primary.main,
	},
}));

export function LinearProgress(props: LinearDeterminateProps) {
	const [progress, setProgress] = useState(0);
	const [countdown, setCountdown] = useState<{ values: string[]; expired: boolean }>({ values: [], expired: false });

	const t = useTranslations();

	useEffect(() => {
		function calculateProgress(created: number, nextPost: number) {
			const diff = created - Date.now();
			const totalTimeSpan = created - nextPost;
			const progressPercentage = (diff / totalTimeSpan) * 100;

			return Math.min(100, Math.max(0, Math.abs(progressPercentage)));
		}

		function calculateCountdown(targetDate: number) {
			const difference = differenceInSeconds(targetDate, new Date());

			if (difference <= 0) {
				return {
					values: ['00', '00', '00'],
					expired: true,
				};
			}

			const formatWithLeadingZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

			const hours = formatWithLeadingZero(Math.floor(difference / 3600));
			const minutes = formatWithLeadingZero(Math.floor((difference % 3600) / 60));
			const seconds = formatWithLeadingZero(difference % 60);

			return {
				values: [hours, minutes, seconds],
				expired: false,
			};
		}

		const timer = setInterval(() => {
			const [createdUnix, nextUnix] = [new Date(props.createdAt).getTime(), new Date(props.nextPost).getTime()];
			setProgress(calculateProgress(createdUnix, nextUnix));
			setCountdown(calculateCountdown(nextUnix));
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [props.createdAt, props.nextPost]);
	return (
		<Box sx={{ width: '100' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', columnGap: '.5rem' }}>
				<BorderLinearProgress variant="determinate" value={progress} />
				<Typography
					sx={{
						fontSize: '11px',
						fontWeight: 600,
						color: t => t.palette.neutral.lightest,
						textAlign: 'right',
						minWidth: '1.5rem',
					}}
				>
					{countdown.expired ? t('commons.Ended') : countdown.values.join(':')}
				</Typography>
			</Box>
		</Box>
	);
}
