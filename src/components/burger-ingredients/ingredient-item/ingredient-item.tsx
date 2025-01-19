import React, { FC } from 'react';

import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

interface Ingredient {
	_id: string;
	name: string;
	type: string;
	price: number;
	image: string;
}

export const IngredientItem: FC<{ ingredient: Ingredient }> = ({
	ingredient,
}) => {
	return (
		<div className={styles.container}>
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={styles.price_container}>
				<p className='text text_type_digits-default'>{ingredient.price}</p>
				<CurrencyIcon type={'primary'} />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>
		</div>
	);
};

IngredientItem.propTypes = {
	ingredient: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};
