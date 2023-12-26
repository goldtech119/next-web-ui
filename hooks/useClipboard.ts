import copyToClipboard from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

type UseClipboardOptions = {
	successDuration?: number;
};

type UseClipboardHook = (
	text: string | undefined,
	options?: UseClipboardOptions,
) => {
	success: boolean;
	copy: () => void;
};

export const useClipboard: UseClipboardHook = (text, options = { successDuration: 3000 }) => {
	const [success, setSuccess] = useState(false);
	const { successDuration } = options;

	useEffect(() => {
		if (success && successDuration) {
			const id = setTimeout(() => {
				setSuccess(false);
			}, successDuration);

			return () => {
				clearTimeout(id);
			};
		}
	}, [success, successDuration]);

	const copy = useCallback(() => {
		if (!text) {
			setSuccess(false);
			return;
		}

		const didCopy = copyToClipboard(text);
		setSuccess(didCopy);
	}, [text]);

	return { success, copy };
};
