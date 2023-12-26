/* eslint-disable @typescript-eslint/naming-convention */

import { createTheme, type LinkProps, type Theme, type ThemeOptions, Zoom } from '@mui/material';
import { type TypographyStyleOptions } from '@mui/material/styles/createTypography';

import { LinkWrapper } from './linkWrapper';

import { IbmPlexMonoFont, LexendFont } from 'misc/fonts';

const darkPalette = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#9e74f4',
			light: '#d8c6fa',
			dark: '#6e41dd',
		},
		secondary: {
			main: '#1be6b0',
			light: '#b6f7e5',
			dark: '#0c6e54',
		},
		neutral: {
			main: '#141718',
			lightest: '#efefef',
			lighter: '#e8ecef',
			light: '#b3b7b9',
			dark: '#6c7275',
			darker: '#343839',
			darkest: '#232627',
		},
		success: { main: '#80a525' },
		warning: { main: '#e5bf2d' },
		error: { main: '#d84c10' },
		info: { main: '#338cd0' },
		divider: 'rgba(95,95,95,0.25)',
	},
} satisfies ThemeOptions);

const lightPalette = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#9e74f4',
			light: '#d8c6fa',
			dark: '#6e41dd',
		},
		secondary: {
			main: '#1be6b0',
			light: '#b6f7e5',
			dark: '#0c6e54',
		},
		neutral: {
			main: '#f6f7f8',
			lightest: '#e8ecef',
			lighter: '#808191',
			light: '#6c7275',
			dark: '#343839',
			darker: '#232627',
			darkest: '#141718',
		},
		success: { main: '#80a525' },
		warning: { main: '#e5bf2d' },
		error: { main: '#d84c10' },
		info: { main: '#338cd0' },
		divider: 'rgba(95,95,95,0.15)',
	},
} satisfies ThemeOptions);

const mergeOverrides = (t: Theme) => {
	const defaultHeaderStyle: TypographyStyleOptions = {
		fontFamily: LexendFont.style.fontFamily,
		letterSpacing: 2,
		fontWeight: 600,
	};

	return createTheme(t, {
		spacing: 8,
		palette: {
			text: {
				primary: t.palette.neutral.light,
				secondary: t.palette.neutral.darker,
			},
			background: {
				default: t.palette.neutral.main,
				paper: t.palette.neutral.darkest,
			},
		},
		typography: {
			fontFamily: LexendFont.style.fontFamily,
			h1: { ...defaultHeaderStyle },
			h2: { ...defaultHeaderStyle },
			h3: { ...defaultHeaderStyle },
			h4: { ...defaultHeaderStyle, textTransform: 'uppercase' },
			h5: { ...defaultHeaderStyle, textTransform: 'uppercase' },
			h6: { ...defaultHeaderStyle, textTransform: 'uppercase' },
			subtitle1: { color: t.palette.text.secondary },
			allVariants: {
				letterSpacing: '0.65px',
			},
			button: {
				fontFamily: LexendFont.style.fontFamily,
			},
		},
		components: {
			MuiLink: {
				defaultProps: {
					component: LinkWrapper,
				},
				styleOverrides: {
					root: {
						textDecoration: 'none',
					},
				},
			},
			MuiButtonBase: {
				defaultProps: {
					LinkComponent: LinkWrapper,
				},
			},
			MuiGrid: {
				defaultProps: {
					spacing: 2,
				},
			},
			MuiButton: {
				defaultProps: {
					variant: 'contained',
					disableElevation: true,
				},
				styleOverrides: {
					root: {
						textTransform: 'none',
						borderRadius: 12,
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					label: {
						color: t.palette.neutral.lightest,
						fontWeight: 600,
						fontSize: '14px',
					},
					root: {
						width: 'fit-content',
						border: 'none',
						minHeight: '20px',
						height: 'auto',
						backgroundColor: t.palette.neutral.darkest,
						borderRadius: '.5rem',
						margin: '4px',
					},
				},
			},
			MuiMenu: {
				defaultProps: {
					transformOrigin: {
						vertical: -8,
						horizontal: 0,
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					root: {
						borderRadius: 12,
					},
				},
			},
			MuiTabs: {
				defaultProps: {
					TabIndicatorProps: {
						sx: {
							display: 'none',
						},
					},
				},
				styleOverrides: {
					root: {
						minHeight: 0,
						'& .MuiTabs-flexContainer': {
							gap: t.spacing(2),
						},
					},
				},
			},
			MuiFormLabel: {
				defaultProps: {
					sx: {
						color: t.palette.text.primary,
						'&.Mui-focused': {
							color: t.palette.text.primary,
						},
					},
				},
			},
			MuiFormControlLabel: {
				defaultProps: {
					sx: {
						color: t.palette.neutral.dark,
						'& .Mui-checked + .MuiFormControlLabel-label': {
							color: t.palette.text.primary,
						},
					},
				},
			},
			MuiTypography: {
				variants: [
					{
						props: { variant: 'monospace' },
						style: { fontFamily: IbmPlexMonoFont.style.fontFamily },
					},
				],
				styleOverrides: {
					root: {
						fontFamily: LexendFont.style.fontFamily,
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: 'none',
					},
				},
			},
			MuiDivider: {
				styleOverrides: {
					root: {
						borderWidth: '1px',
					},
				},
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						borderRadius: '.75rem',
						borderColor: 'transparent',
						paddingLeft: '1rem',
						fontFamily: LexendFont.style.fontFamily,
						fontSize: '14px',
						boxSizing: 'border-box',
						width: '100%',
						'&.MuiInput-root': {
							background: t.palette.neutral.main,
							border: `2px solid ${t.palette.neutral.darker}`,
							':focus-within:not(.Mui-error)': {
								border: `2px solid ${t.palette.primary.main}`,
								backgroundColor: t.palette.neutral.main,
								color: t.palette.neutral.lighter,
							},
							'&.Mui-error': {
								color: t.palette.error.main,
							},
							'&.Mui-disabled': {
								backgroundColor: t.palette.neutral.main,
								border: `2px solid ${t.palette.neutral.darker}`,
								'& input': {
									opacity: 0.4,
								},
							},
						},
						'::before, ::after': {
							borderColor: 'transparent!important',
						},
					},
				},
			},
			MuiInput: {
				styleOverrides: {
					root: {
						borderRadius: '.75rem',
					},
					input: {
						minHeight: '48px',
						padding: 0,
						border: '2px solid transparent',
						boxSizing: 'border-box',
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						minHeight: '48px',
						padding: '4px',
						alignItems: 'center',
						borderRadius: '12px',
						boxSizing: 'border-box',
						background: t.palette.neutral.main,
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					tag: {
						margin: '4px',
					},
				},
			},
			MuiTextField: {
				defaultProps: { color: 'primary' },
			},
			MuiTab: {
				defaultProps: { iconPosition: 'end' },
				styleOverrides: {
					root: {
						color: t.palette.neutral.lightest,
						background: 'transparent',
						textTransform: 'none',
						borderRadius: t.spacing(1.5),
						borderColor: t.palette.primary.dark,
						borderStyle: 'solid',
						borderWidth: 1,
						fontWeight: 600,
						padding: `${t.spacing(1)} ${t.spacing(4)}`,
						minHeight: 'unset',
						'&.Mui-selected': {
							color: t.palette.neutral.lightest,
							background: t.palette.primary.dark,
							borderWidth: 1,
							borderStyle: 'solid',
						},
						'& .MuiTabs-indicator': {
							display: 'none',
						},
					},
				},
			},
			MuiTooltip: {
				defaultProps: {
					arrow: true,
					TransitionComponent: Zoom,
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: '24px',
						background: t.palette.neutral.main,
					},
				},
			},
		},
	} satisfies ThemeOptions);
};

export const themes = {
	light: mergeOverrides(lightPalette),
	dark: mergeOverrides(darkPalette),
};
