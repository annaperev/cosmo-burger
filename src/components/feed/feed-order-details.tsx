import { useParams } from 'react-router-dom';
import styles from './feed.module.css';
import { orders } from './feed';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/selectors';
import { Ingredient } from '../../types';
import { fetchIngredients } from '../../services/ingredients/thunk-get-ingredients';

export const FeedOrderDetails = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	const orderId = useParams<'id'>();
	const order = orders.find((order) => order._id === orderId.id);
	const { ingredients } = useAppSelector(getIngredients);
	if (!order) return null;
	const orderIngredients: Ingredient[] = order.ingredients.map(
		(id) => ingredients.find((ingredient) => ingredient._id === id)!
	);

	console.log('orderIngredients', orderIngredients);
	const ingredientCountMap = getIngredientArray(orderIngredients);

	return (
		order && (
			<div className={styles.order_details}>
				<p
					style={{ alignSelf: 'center' }}
					className='text text_type_digits-default  mb-10'>
					#{order.number}
				</p>
				<p className='text text_type_main-medium mb-3'>{order.name}</p>
				<p
					style={{ color: '#00CCCC' }}
					className='text text_type_main-small mb-15'>
					{order.status}
				</p>
				<p className='text text_type_main-medium mb-6'>Состав: </p>
				<div className={styles.ingredients}>
					{ingredientCountMap.map((item) => (
						<div key={item.ingredient._id} className={styles.ingredient}>
							<div className={styles.ingredient_left}>
								<img
									className={`${styles.image}`}
									src={item.ingredient.image}
									alt={item.ingredient.name}
								/>
								<p
									className={`${styles.ingredient_name} text text_type_main-default`}>
									{item.ingredient.name}
								</p>
							</div>
							<div
								className={`${styles.ingredient_right} mr-6 text text_type_digits-default`}>
								<div>{item.count}</div>
								<p>x</p>
								<div>{item.ingredient.price}</div>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					))}
				</div>
				<div className={styles.ingredient}>
					<FormattedDate
						className={`${styles.ingredient_left} text text_type_main-default text_color_inactive`}
						date={new Date(order.createdAt)}
					/>
					<div
						className={`${styles.ingredient_right} mr-6 text text_type_digits-default`}>
						<div>{order.sum}</div>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		)
	);
};

interface IngredientCount {
	ingredient: Ingredient;
	count: number;
}

function getIngredientArray(ingredients: Ingredient[]): IngredientCount[] {
	const ingredientCounts: IngredientCount[] = [];
	const counts: { [key: string]: { ingredient: Ingredient; count: number } } =
		{};

	// Find the bun and add it first to the array
	const bun = ingredients.find((item) => item.type === 'bun');
	if (bun) {
		ingredientCounts.push({ ingredient: bun, count: 2 });
	}
	// Count occurrences of other ingredients
	for (let i = 0; i < ingredients.length; i++) {
		const ingredient = ingredients[i];
		if (ingredient.type !== 'bun') {
			if (!counts[ingredient.name]) {
				counts[ingredient.name] = { ingredient, count: 1 };
			} else {
				counts[ingredient.name].count++;
			}
		}
	}

	// Convert counts object to an array and sort by count in descending order
	const sortedIngredients = Object.values(counts).sort(
		(a, b) => b.count - a.count
	);

	// Add sorted ingredients to the result array
	ingredientCounts.push(...sortedIngredients);

	console.log(ingredientCounts);

	return ingredientCounts;
}
