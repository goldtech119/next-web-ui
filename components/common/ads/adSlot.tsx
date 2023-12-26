'use client';

import { useAuth } from '#components/contexts/authContext';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

export interface AdSlotProps {
  type: 'square' | 'leaderboard' | 'video';
  id: string;
  sticky?: boolean;
}

export type AdSlotType =
  | 'pb-slot-dyno-display-1'
  | 'pb-slot-dyno-display-2'
  | 'pb-slot-outstream';

const ADS_METADATA: Record<
  AdSlotProps['type'],
  { adSlot: AdSlotType; size: [number, number] }
> = {
	square: {
		adSlot: 'pb-slot-dyno-display-1',
		size: [300, 250],
	},
	leaderboard: {
		adSlot: 'pb-slot-dyno-display-2',
		size: [728, 90],
	},
	video: {
		adSlot: 'pb-slot-outstream',
		size: [640, 480],
	},
};

export const AdSlot: React.FC<AdSlotProps> = ({ type, id, sticky }) => {
	const { user } = useAuth();
	const query = useSearchParams();
	const isLocalhost = useState(() => {
		if (typeof window !== 'undefined') {
			return window.location.href.includes('localhost');
		}
	});
	const adMetadata = useMemo(() => ADS_METADATA[type], [type]);
	const size = useMemo(() => adMetadata.size, [adMetadata?.size]);
	const shouldDisplayAd = useMemo(
		() =>
			query.get('ads') !== undefined && isLocalhost
				? query.get('ads') !== 'false'
				: Boolean(user?.isPremium),
		[isLocalhost, query, user?.isPremium],
	);

	const cn = useMemo(() => {
		const classes: string[] = [];

		switch (adMetadata.adSlot) {
			case 'pb-slot-dyno-display-1': {
				classes.push('is-full-touch');
				classes.push('ad-container');
				break;
			}

			case 'pb-slot-dyno-display-2': {
				classes.push('top-ad-container');
				if (sticky) {
					classes.push('sticky-adhesion');
				}

				break;
			}

			default: {
				break;
			}
		}

		return classes.join(' ');
	}, [adMetadata.adSlot, sticky]);

	useEffect(() => {
		window.tude = window.tude || { cmd: []};

		window.tude.cmd.push(() => {
			if (window.tude?.refreshAdsViaDivMappings) {
				window.tude.refreshAdsViaDivMappings([
					{
						divId: id,
						baseDivId: adMetadata.adSlot,
					},
				]);
			}
		});
	}, [adMetadata.adSlot, id]);

	return shouldDisplayAd ? (
		<Box
			id={id}
			className={cn}
			sx={{
				display: 'grid',
				placeContent: 'center',
				height: '100%',
				width: '100%',
				minWidth: size[0],
				minHeight: size[1],
				maxWidth: size[0],
				maxHeight: size[1],
				backgroundColor: t => t.palette.neutral.dark,
				color: t => t.palette.getContrastText(t.palette.neutral.dark),
				marginX: 'auto',
				marginBottom: '8px',
			}}
		>
			{isLocalhost && `${type}: ${size[0]}x${size[1]}`}
		</Box>
	) : null;
};
