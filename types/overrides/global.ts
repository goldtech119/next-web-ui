import type { AdSlotType } from '#components/common/ads/adSlot';

declare global {
	interface Window {
		tude?: {
			cmd: Array<() => void>;
			refreshAdsViaDivMappings?: (mappings: Array<{ divId: string; baseDivId: AdSlotType }>) => void;
		};
	}
}

export {};
