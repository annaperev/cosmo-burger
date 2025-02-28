import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/selectors';
import { useParams } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients/thunk-get-ingredients';

export const IngredientDetails = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	const ingredientId = useParams<'ingredientId'>();

	const { ingredients } = useAppSelector(getIngredients);

	const ingredient = ingredients.find(
		(item) => item._id === ingredientId.ingredientId
	);

	return (
		ingredient && (
			<div className={styles.container}>
				<p className='text text_type_main-large'>Детали ингридиента</p>
				<img
					className={`${styles.image}`}
					src={ingredient.image}
					alt={ingredient.name}
				/>
				<p className='text text_type_main-medium mb-8'>{ingredient.name}</p>
				<div
					className={`${styles.energy_value} 'text text_type_main-default text_color_inactive`}>
					<div className='p-1'>
						Каларии,ккал
						<br />
						{ingredient.calories}
					</div>
					<div className='p-1'>
						Белки, г
						<br />
						{ingredient.proteins}
					</div>
					<div className='p-1'>
						Жиры, г
						<br />
						{ingredient.fat}
					</div>
					<div className='p-1'>
						Углеводы, г
						<br />
						{ingredient.carbohydrates}
					</div>
				</div>
			</div>
		)
	);
};
