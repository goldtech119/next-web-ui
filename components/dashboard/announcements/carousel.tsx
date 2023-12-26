import { autoSwitchPlugin } from '#helpers/keen-slider/plugins/autoSwitch';
import { mutationPlugin } from '#helpers/keen-slider/plugins/mutation';
import { resizePlugin } from '#helpers/keen-slider/plugins/resize';
import { Close } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import React, { useEffect, useState } from 'react';
import { BasicAnnouncement } from './basic';

export interface AnnouncementsCarouselProps {}

export const AnnouncementsCarousel: React.FC<AnnouncementsCarouselProps> = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			initial: 0,
			slideChanged(s) {
				setCurrentSlide(s.track.details.rel);
			},
			created() {
				setLoaded(true);
			},
			loop: true,
			slides: {
				spacing: 32,
			},
		},
		[autoSwitchPlugin({ timeout: 5000 }), mutationPlugin(), resizePlugin()],
	);

	const [announcements, setAnnouncements] = useState<React.ReactNode[]>([]);

	useEffect(() => {
		// TODO: fetch announcements data from db, map to templates
		const mockAnnouncements: React.ReactNode[] = [
			<BasicAnnouncement
				key='1'
				title='Getting Started'
				description='Manage your bot sttings here. Not sure where to begin?'
				button={{ url: '/foo', external: true, label: 'Walk me through' }}
			/>,
			<BasicAnnouncement key='2' title='Elevate your experience' description='Upgrade to Dyno Premium today!' />,
		];

		setAnnouncements(mockAnnouncements);
	}, []);

	return announcements ? (
		<Box sx={{ mx: 'auto', position: 'relative' }}>
			<div className='keen-slider' ref={sliderRef}>
				{announcements.map((announcement, index) => (
					<div key={index} className='keen-slider__slide' style={{ position: 'relative' }}>
						{announcement}
						<IconButton
							onClick={() => {
								setAnnouncements(a => a.filter((_, i) => i !== index));
							}}
							sx={{
								position: 'absolute',
								top: t => t.spacing(1),
								right: t => t.spacing(1),
							}}
						>
							<Close />
						</IconButton>
					</div>
				))}
			</div>
			{loaded && instanceRef.current && (
				<Box
					sx={{
						display: 'grid',
						gridAutoFlow: 'column',
						gap: 1,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						bottom: 16,
						left: 0,
						right: 0,
						'& .dot': {
							backgroundColor: '#fefefe',
							borderRadius: '50%',
							height: 4,
							width: 4,
							border: 'none',
							outline: 0,
							position: 'relative',
							opacity: 0.5,
							p: 0,
							'&::before': {
								content: '""',
								position: 'absolute',
								top: -3,
								bottom: -3,
								left: -3,
								right: -3,
								opacity: 0,
								backgroundColor: '#fefefe',
								borderRadius: '50%',
							},
							'&.active': {
								opacity: 1,
								'&::before': {
									opacity: 0.2,
								},
							},
						},
					}}
				>
					{announcements.length > 1
						&& [...new Array<unknown>(announcements.length)].map((_, idx) => (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={'dot' + (currentSlide === idx ? ' active' : '')}
								aria-label={`Select item number ${idx}`}
							/>
						))}
				</Box>
			)}
		</Box>
	) : null;
};
