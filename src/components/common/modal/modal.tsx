import React, { FC, MouseEventHandler, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

export const Modal: FC<{
	header: string;
	onClose: () => void;
	children: React.ReactNode;
}> = ({ children, header, onClose }) => {
	// todo не работает закрытие по escape
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
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<p className='text text_type_main-large'>{header}</p>
					<button
						className={`${styles.close} 'text text_type_main-large'`}
						onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};
