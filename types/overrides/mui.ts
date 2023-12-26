declare module '@mui/material/styles' {
	interface PaletteColor {
		lightest: string;
		lighter: string;
		darker: string;
		darkest: string;
	}
	interface SimplePaletteColorOptions {
		lightest?: string;
		lighter?: string;
		darker?: string;
		darkest?: string;
	}
	interface Palette {
		neutral: PaletteColor;
	}
	interface PaletteOptions {
		neutral?: SimplePaletteColorOptions;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		neutral: true;
	}
}

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsColorOverrides {
		neutral: true;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		monospace: true;
	}
}

export {};
