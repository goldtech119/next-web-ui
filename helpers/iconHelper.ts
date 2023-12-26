import * as CustomIcons from '#components/common/icons';

export type CustomIconName = keyof typeof CustomIcons;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const getCustomIcon = (icon: CustomIconName | string) => {
	if (icon in CustomIcons) {
		return CustomIcons[icon as CustomIconName];
	}
};
