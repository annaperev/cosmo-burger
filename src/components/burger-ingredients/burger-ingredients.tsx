import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../../app/utils/data';
import {
	IngredientGroup,
	typeTranslations,
} from './ingredient-group/ingredient-group';

export const BurgerIngredients = () => {
	const handleClick = () => {
		console.log('click');
	};

	const uniqueTypes = Array.from(
		new Set(ingredients.map((ingredient) => ingredient.type))
	);

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			{/*/!*todo - не виден текст заголовка:(( *!/*/}
			{/*<nav className={styles.component_type_tab}>*/}
			{/*	{uniqueTypes.map((type) => (*/}
			{/*		<Tab*/}
			{/*			key={type}*/}
			{/*			active={type === 'bun'}*/}
			{/*			onClick={handleClick}*/}
			{/*			value={typeTranslations[type]}*/}
			{/*		/>*/}
			{/*	))}*/}
			{/*</nav>*/}
			<nav className={styles.component_type_tab}>
				<Tab active={true} onClick={handleClick} value={'Булки'}>
					Булки
				</Tab>
				<Tab active={false} onClick={handleClick} value={'Соусы'}>
					Соусы
				</Tab>
				<Tab active={false} onClick={handleClick} value={'Начинки'}>
					Начинки
				</Tab>
			</nav>
			<div className={styles.list}>
				{uniqueTypes.map((type) => (
					<IngredientGroup key={type} type={type} />
				))}
			</div>
		</div>
	);
};
