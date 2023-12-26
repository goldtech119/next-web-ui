export const hexToDiscordColor = (hex: string) => parseInt(hex, 16);

export const discordColorToHex = (color: string | number) => `#${Number(color).toString(16).padStart(6, '0')}`;

export const hexToRgba = (hex: string, alpha: number = 1) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : hex;
};
