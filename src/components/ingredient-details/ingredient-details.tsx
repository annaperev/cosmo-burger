import React from 'react';
import styles from './ingredient-details.module.css';
import { useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/selectors';
import { useParams } from 'react-router-dom';

export const IngredientDetails = () => {
	// const { ingredient } = useAppSelector(getIngredient);
	const ingredientId = useParams<'ingredientId'>();
	console.log('ingredientId', ingredientId);

	const { ingredients } = useAppSelector(getIngredients);

	const ingredient = ingredients.find(
		(item) => item._id === ingredientId.ingredientId
	);

	return (
		ingredient && (
			<div className={styles.container}>
				<img
					className={`${styles.image} mb-4`}
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
