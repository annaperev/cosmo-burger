import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlay: React.FC<{ onClose: () => void }> = ({
	onClose,
}) => {
	return (
		<div
			className={styles.overlay}
			onClick={(e) => {
				e.stopPropagation();
				onClose();
			}}></div>
	);
};
