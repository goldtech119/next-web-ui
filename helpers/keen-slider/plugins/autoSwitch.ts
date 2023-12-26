import { KeenSliderPlugin } from 'keen-slider/react';

export const autoSwitchPlugin
	= (options: { timeout: number }): KeenSliderPlugin =>
		slider => {
			let timeout: ReturnType<typeof setTimeout>;
			let mouseOver = false;
			const clearNextTimeout = () => {
				clearTimeout(timeout);
			};

			const nextTimeout = () => {
				clearTimeout(timeout);

				if (mouseOver) {
					return;
				}

				timeout = setTimeout(() => {
					slider.next();
				}, options.timeout);
			};

			slider.on('created', () => {
				slider.container.addEventListener('mouseover', () => {
					mouseOver = true;
					clearNextTimeout();
				});
				slider.container.addEventListener('mouseout', () => {
					mouseOver = false;
					nextTimeout();
				});
				nextTimeout();
			});
			slider.on('dragStarted', clearNextTimeout);
			slider.on('animationEnded', nextTimeout);
			slider.on('updated', nextTimeout);
		};
