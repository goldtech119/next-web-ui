import { KeenSliderPlugin } from 'keen-slider/react';

export const adaptiveHeightPlugin = (): KeenSliderPlugin => slider => {
	const updateHeight = () => {
		const activeSlide = slider.slides[slider.track.details.position];

		slider.container.style.height = `${activeSlide.offsetHeight}px`;
	};

	slider.on('created', updateHeight);
	slider.on('slideChanged', updateHeight);
};
