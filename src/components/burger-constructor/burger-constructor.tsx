import React, { useCallback } from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	addBun,
	addConstructorIngredient,
	removeConstructorIngredient,
	reorderIngredients,
} from '../../services/burger-constructor/actions';
import { Ingredient } from '../../types';
import { useDrop } from 'react-dnd';
import { postOrder } from '../../services/order/thunk-post-order';
import { DraggableIngredient } from './constructor-element/constructor-element';
import {
	calcTotalSum,
	getConstructorIngredients,
} from '../../services/selectors';

export const BurgerConstructor = () => {
	//global state
	const { bun, ingredients } = useAppSelector(getConstructorIngredients);
	const dispatch = useAppDispatch();
	const handleRemove = (ingredient: Ingredient) => {
		dispatch(removeConstructorIngredient(ingredient));
	};

	//drop
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'ingredient',
		drop: (ingredient: Ingredient) => {
			if (ingredient.type === 'bun') {
				dispatch(addBun(ingredient));
			} else {
				dispatch(addConstructorIngredient(ingredient));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	//sortable list
	const moveIngredient = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(reorderIngredients(ingredients, dragIndex, hoverIndex));
		},
		[ingredients, dispatch]
	);

	const totalSum = useAppSelector(calcTotalSum);

	const BunElement = ({
		bun,
		type,
		emptyClass,
		emptyText,
	}: {
		bun: Ingredient | null;
		type: 'top' | 'bottom';
		emptyClass: string;
		emptyText: string;
	}) => {
		return bun ? (
			<ConstructorElement
				text={`${bun.name} (${type === 'top' ? 'верх' : 'низ'})`}
				type={type}
				isLocked={true}
				price={bun.price}
				thumbnail={bun.image}
				extraClass='ml-10'
			/>
		) : (
			<div className={`${emptyClass} 'text text_type_digits-medium'`}>
				{emptyText}
			</div>
		);
	};

	return (
		<div
			ref={drop}
			className={`${styles.container} pb-4`}
			style={{ opacity: isOver ? 0.5 : 1 }}>
			<span className={styles.spacer}></span>
			<div className={styles.list}>
				<BunElement
					bun={bun}
					type='top'
					emptyClass={styles.empty_top_bun}
					emptyText='Выберите булки'
				/>
				<div className={styles.scrollable}>
					{ingredients.length > 0 ? (
						ingredients.map((ingredient, index) => (
							<div key={ingredient.key} className={`pl-4 ${styles.squeezed}`}>
								<DraggableIngredient
									key={ingredient.key}
									index={index}
									ingredient={ingredient}
									moveIngredient={moveIngredient}
									handleRemove={handleRemove}
								/>
							</div>
						))
					) : (
						<div
							className={`${styles.empty_ingredient} 'text text_type_digits-medium'`}>
							Выберите начинку
						</div>
					)}
				</div>
				<BunElement
					bun={bun}
					type='bottom'
					emptyClass={styles.empty_bottom_bun}
					emptyText='Выберите булки'
				/>
			</div>
			<div className={styles.footer}>
				<div>
					<span className='text text_type_digits-medium'>{totalSum}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					onClick={() =>
						bun && dispatch(postOrder({ bun: bun, ingredients: ingredients }))
					}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
