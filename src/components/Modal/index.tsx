import {
	ReactEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styles from './styles.module.scss';

interface ModalProps {
	open: boolean;
	locked: boolean;
	onClose: () => void;
	children: React.ReactNode;
	// Add any other props you want to pass to the dialog element
}

export default function Modal({ open, locked, onClose, children }: ModalProps) {
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const [showModal, setShowModal] = useState(false);

	// work out which classes should be applied to the dialog element
	const dialogClasses = useMemo(() => {
		const _arr = [styles['modal']];
		if (!open) _arr.push(styles['modal--closing']);

		return _arr.join(' ');
	}, [open]);

	// Eventlistener: trigger onclose when cancel detected
	const onCancel: ReactEventHandler<HTMLDialogElement> = useCallback(
		(e) => {
			e.preventDefault();
			if (!locked) onClose();
		},
		[locked, onClose]
	);

	// Eventlistener: trigger onclose when click outside
	const onClick = useCallback(
		({ target }: React.MouseEvent) => {
			const { current: el } = modalRef;
			if (target === el && !locked) onClose();
		},
		[locked, onClose]
	);

	// Eventlistener: trigger close click on anim end
	const onAnimEnd = useCallback(() => {
		const { current: el } = modalRef;
		if (!open) {
			el?.close();
			setShowModal(false);
		}
	}, [open]);

	// when open changes run open/close command
	useEffect(() => {
		const { current: el } = modalRef;
		if (el && open && !el.open) {
			setShowModal(true);
			el.showModal();
		}
	}, [open]);

	return (
		<dialog
			ref={modalRef}
			className={dialogClasses}
			onClose={onClose}
			onCancel={onCancel}
			onClick={onClick}
			onAnimationEnd={onAnimEnd}
		>
			{showModal && (
				<div className={styles['modal__container']}>{children}</div>
			)}
		</dialog>
	);
}
