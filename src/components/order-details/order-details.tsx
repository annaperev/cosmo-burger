import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails = () => {
	return (
		<div className={styles.container}>
			<p className={`${styles.id} text text_type_digits-large pt-20`}>034536</p>
			<p className='text text_type_main-medium mt-6'>идентификатор заказа</p>
			<CheckMarkIcon className={styles.check_mark} type='primary' />
			<p className='text text_type_main-small'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-small text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
