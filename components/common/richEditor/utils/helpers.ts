import { $isAtNodeEnd } from '@lexical/selection';
import { ElementNode, RangeSelection, TextNode } from 'lexical';

const SUPPORTED_URL_PROTOCOLS = new Set([
	'http:',
	'https:',
	'mailto:',
	'sms:',
	'tel:',
]);

export const sanitizeUrl = (url: string): string => {
	try {
		const parsedUrl = new URL(url);

		if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
			return 'about:blank';
		}

		return url;
	} catch {
		return url;
	}
};

export const getSelectedNode = (
	selection: RangeSelection,
): TextNode | ElementNode => {
	const { anchor } = selection;
	const { focus } = selection;
	const anchorNode = selection.anchor.getNode();
	const focusNode = selection.focus.getNode();

	if (anchorNode === focusNode) {
		return anchorNode;
	}

	const isBackward = selection.isBackward();

	if (isBackward) {
		return $isAtNodeEnd(focus) ? anchorNode : focusNode;
	}

	return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
};
