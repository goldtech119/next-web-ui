import * as React from 'react';
import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

type DropdownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropdownContext = React.createContext<DropdownContextType | null>(null);

const dropdownPadding = 4;

type DropdownItemProps = {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
	children,
	className,
	onClick,
	title,
}) => {
	const ref = useRef<HTMLButtonElement>(null);

	const dropdownContext = React.useContext(DropdownContext);

	if (dropdownContext === null) {
		throw new Error('DropdownItem must be used within a Dropdown');
	}

	const { registerItem } = dropdownContext;

	useEffect(() => {
		if (ref && ref.current) {
			registerItem(ref);
		}
	}, [ref, registerItem]);

	return (
		<button
			className={className}
			onClick={onClick}
			ref={ref}
			title={title}
			type='button'
		>
			{children}
		</button>
	);
};

type DropdownItemsProps = {
  children: React.ReactNode;
  dropdownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
};

const DropdownItems: React.FC<DropdownItemsProps> = ({
	children,
	dropdownRef,
	onClose,
}) => {
	const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
	const [highlightedItem, setHighlightedItem]
    = useState<React.RefObject<HTMLButtonElement>>();

	const registerItem = useCallback(
		(itemRef: React.RefObject<HTMLButtonElement>) => {
			setItems(prev => (prev ? [...prev, itemRef] : [itemRef]));
		},
		[setItems],
	);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (!items) {
			return;
		}

		const { key } = event;

		if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
			event.preventDefault();
		}

		switch (key) {
			case 'Tab':
			case 'Escape': {
				onClose();
				break;
			}

			case 'ArrowUp': {
				setHighlightedItem(prev => {
					if (!prev) {
						return items[0];
					}

					const index = items.indexOf(prev) - 1;
					return items[index === -1 ? items.length - 1 : index];
				});
				break;
			}

			case 'ArrowDown': {
				setHighlightedItem(prev => {
					if (!prev) {
						return items[0];
					}

					return items[items.indexOf(prev) + 1];
				});
				break;
			}

			default: {
				break;
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			registerItem,
		}),
		[registerItem],
	);

	useEffect(() => {
		if (items && !highlightedItem) {
			setHighlightedItem(items[0]);
		}

		if (highlightedItem && highlightedItem.current) {
			highlightedItem.current.focus();
		}
	}, [items, highlightedItem]);

	return (
		<DropdownContext.Provider value={contextValue}>
			<div className='dropdown' ref={dropdownRef} onKeyDown={handleKeyDown}>
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

type DropdownProps = {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  children: ReactNode;
  stopCloseOnClickSelf?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
	disabled,
	buttonLabel,
	buttonAriaLabel,
	buttonClassName,
	buttonIconClassName,
	children,
	stopCloseOnClickSelf,
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleClose = () => {
		setShowDropdown(false);

		if (buttonRef && buttonRef.current) {
			buttonRef.current.focus();
		}
	};

	useEffect(() => {
		const button = buttonRef.current;
		const dropdown = dropdownRef.current;

		if (showDropdown && button !== null && dropdown !== null) {
			const { top, left } = button.getBoundingClientRect();

			dropdown.style.top = `${top + button.offsetHeight + dropdownPadding}px`;
			dropdown.style.left = `${Math.min(
				left,
				window.innerWidth - dropdown.offsetWidth - 20,
			)}px`;
		}
	}, [dropdownRef, buttonRef, showDropdown]);

	useEffect(() => {
		const button = buttonRef.current;

		if (button !== null && showDropdown) {
			const handle = (event: MouseEvent) => {
				const { target } = event;
				if (stopCloseOnClickSelf) {
					if (
						dropdownRef.current
            && dropdownRef.current.contains(target as Node)
					) {
						return;
					}
				}

				if (!button.contains(target as Node)) {
					setShowDropdown(false);
				}
			};

			document.addEventListener('click', handle);

			return () => {
				document.removeEventListener('click', handle);
			};
		}
	}, [dropdownRef, buttonRef, showDropdown, stopCloseOnClickSelf]);

	useEffect(() => {
		const handleButtonPositionUpdate = () => {
			if (showDropdown) {
				const button = buttonRef.current;
				const dropdown = dropdownRef.current;

				if (button !== null && dropdown !== null) {
					const { top } = button.getBoundingClientRect();
					const newPosition = top + button.offsetHeight + dropdownPadding;

					if (newPosition !== dropdown.getBoundingClientRect().top) {
						dropdown.style.top = `${newPosition}px`;
					}
				}
			}
		};

		document.addEventListener('scroll', handleButtonPositionUpdate);

		return () => {
			document.removeEventListener('scroll', handleButtonPositionUpdate);
		};
	}, [buttonRef, dropdownRef, showDropdown]);

	return (
		<>
			<button
				type='button'
				disabled={disabled}
				aria-label={buttonAriaLabel || buttonLabel}
				className={buttonClassName}
				onClick={() => setShowDropdown(!showDropdown)}
				ref={buttonRef}
			>
				{buttonIconClassName && <span className={buttonIconClassName} />}
				{buttonLabel && (
					<span className='text dropdown-button-text'>{buttonLabel}</span>
				)}
				<i className='chevron-down' />
			</button>

			{showDropdown
        && createPortal(<DropdownItems dropdownRef={dropdownRef} onClose={handleClose}>{children}</DropdownItems>, document.body)}
		</>
	);
};

export default Dropdown;
