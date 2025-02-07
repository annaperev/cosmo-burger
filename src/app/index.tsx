import styles from './app.module.scss';

import { AppHeader } from '../components/app-header/app-header';
import React from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { Modal } from '../components/common/modal/modal';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../services/store';
import { CLOSE_MODAL_INGREDIENT } from '../services/ingredient/actions';
import { OrderDetails } from '../components/order-details/order-details';
import { EMPTY_ORDER_NUMBER } from '../services/order/actions';

export const App = () => {
	const { ingredient } = useAppSelector((store) => store.ingredient);
	const { orderNumber } = useAppSelector((store) => store.order);

	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			<AppHeader className={styles.header} />
			<main className={styles.content}>
				<>
					<BurgerIngredients />

					<BurgerConstructor />
				</>
			</main>
			{ingredient && (
				<Modal
					header='Детали ингридиента'
					onClose={() => dispatch({ type: CLOSE_MODAL_INGREDIENT })}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
			{orderNumber && (
				<Modal header='' onClose={() => dispatch({ type: EMPTY_ORDER_NUMBER })}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</div>
	);
};
