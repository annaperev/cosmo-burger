import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

export const Modal: FC<{
	onClose: () => void;
	children: React.ReactNode;
}> = ({ children, onClose }) => {
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose(); // Закрываем модальное окно
			}
		};

		// Навешиваем обработчик
		document.addEventListener('keydown', handleEscKey);

		// Удаляем обработчик при размонтировании
		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose]);

	if (!modalRoot) throw new Error('Modal root element not found');
	return createPortal(
		<div className={styles.wrapper}>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal} data-testid="modal-container">
				<button
				data-testid="modal-close"
					className={`${styles.close} 'text text_type_main-large'`}
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}>
					<CloseIcon type='primary' />
				</button>
				<div>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};
