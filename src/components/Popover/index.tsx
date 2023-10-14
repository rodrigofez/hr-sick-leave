import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface PopoverProps {
	content: ReactNode;
	children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	const togglePopover = () => {
		setIsOpen(!isOpen);
	};

	const closePopover = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		function handleClickOutside(event: globalThis.MouseEvent) {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				closePopover();
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className={styles.popover} ref={popoverRef}>
			<div className={styles.trigger} onClick={togglePopover}>
				{children}
			</div>
			{isOpen && <div className={styles['popover-content']}>{content}</div>}
		</div>
	);
};

export default Popover;
