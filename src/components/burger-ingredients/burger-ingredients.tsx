import React, { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	IngredientGroup,
	typeTranslations,
} from './ingredient-group/ingredient-group';
import { Ingredient } from '../../types';

export const BurgerIngredients: FC<{ ingredients: Ingredient[] }> = ({
	ingredients,
}) => {
	const uniqueTypes = Array.from(
		new Set(ingredients.map((ingredient) => ingredient.type))
	);

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			<nav className={styles.component_type_tab}>
				{uniqueTypes.map((type) => (
					<Tab
						key={type}
						active={type === 'bun'}
						onClick={() => console.log('click')}
						value={type}>
						{typeTranslations[type]}
					</Tab>
				))}
			</nav>
			<div className={styles.list}>
				{uniqueTypes.map((type) => (
					<IngredientGroup
						key={type}
						type={type}
						ingredients={ingredients.filter((i) => i.type === type)}
					/>
				))}
			</div>
		</div>
	);
};
