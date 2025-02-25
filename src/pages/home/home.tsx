import styles from './home.module.css';

import React from 'react';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Modal } from '../../components/common/modal/modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { OrderDetails } from '../../components/order-details/order-details';
import { EMPTY_ORDER_NUMBER } from '../../services/order/actions';
import { getOrderNumber } from '../../services/selectors';
import { Loader } from '../../components/common/loader/loader';

export const Home = () => {
	const { orderNumber, isPosting } = useAppSelector(getOrderNumber);

	const dispatch = useAppDispatch();

	return (
		<>
			<main className={styles.content}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
			{isPosting && (
				<Modal
					onClose={() => {
						return;
					}}>
					<p className='text text_type_main-large'>Оформляем заказ... </p>
					<Loader size={'large'} inverse={true} />
				</Modal>
			)}
			{orderNumber && (
				<Modal onClose={() => dispatch({ type: EMPTY_ORDER_NUMBER })}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</>
	);
};
