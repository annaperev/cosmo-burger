import React, { useCallback } from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import {
	AppDispatch,
	useAppDispatch,
	useAppSelector,
} from '../../services/store';
import {
	addBun,
	addConstructorIngredient,
	removeConstructorIngredient,
	reorderIngredients,
} from '../../services/burger-constructor/actions';
import { Ingredient } from '../../types';
import { useDrop } from 'react-dnd';
import { postOrder } from '../../services/order/thunk-order';
import { DraggableIngredient } from './constructor-element/constructor-element';
import {
	calcOrderSumInConstructor,
	getConstructorIngredients,
	getUser,
} from '../../services/selectors';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor = () => {
	const { bun, ingredients } = useAppSelector(getConstructorIngredients);
	const user = useAppSelector(getUser);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useAppDispatch();
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

	const totalSum = useAppSelector(calcOrderSumInConstructor);

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

	const handleCreateOrder = () => {
		if (!user) {
			navigate('/login', { state: { from: location } });
			return;
		}
		bun && dispatch(postOrder({ bun: bun, ingredients: ingredients }));
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
					onClick={handleCreateOrder}
					disabled={!bun}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
