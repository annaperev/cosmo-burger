import React, { FC } from 'react';

import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Ingredient } from '../../../types';
import { Modal } from '../../common/modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';

export const IngredientItem: FC<{ ingredient: Ingredient }> = ({
	ingredient,
}) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<div className={styles.container} onClick={toggleModal}>
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={styles.price_container}>
				<p className='text text_type_digits-default'>{ingredient.price}</p>
				<CurrencyIcon type={'primary'} />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>

			{isModalOpen && (
				<Modal header='Детали ингридиента' onClose={toggleModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</div>
	);
};

PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
}).isRequired;
