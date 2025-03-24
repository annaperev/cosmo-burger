import React, { FC } from 'react';

import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { OPEN_MODAL_INGREDIENT } from '../../../services/ingredient/actions';
import { useDrag } from 'react-dnd';
import { calcIngredientCounter } from '../../../services/selectors';
import { useLocation, Link } from 'react-router-dom';

interface IngredientItemProps {
	ingredient: Ingredient;
}

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const dispatch = useAppDispatch();

	const count = useAppSelector((state) =>
		calcIngredientCounter(state, ingredient)
	);

	const location = useLocation();
	const ingredientId = ingredient._id;

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}>
			<div
				ref={drag}
				className={styles.container}
				style={{ opacity: isDragging ? 0.5 : 1, color: 'white' }}
				onClick={() =>
					dispatch({ type: OPEN_MODAL_INGREDIENT, payload: ingredient })
				}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						dispatch({
							type: OPEN_MODAL_INGREDIENT,
							payload: ingredient,
						});
					}
				}}>
				<div className={styles.div1}>
					<img src={ingredient.image} alt={ingredient.name} />
					<div className={styles.price_container}>
						<p className='text text_type_digits-default'>{ingredient.price}</p>
						<CurrencyIcon type={'primary'} />
					</div>
					<p className='text text_type_main-default'>{ingredient.name}</p>
				</div>
				{!!count && (
					<div className={`${styles.counter} text text_type_digits-default`}>
						{count}
					</div>
				)}
			</div>
		</Link>
	);
};
