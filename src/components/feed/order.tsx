import React, { FC } from 'react';
import styles from './feed.module.css';
import { useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/selectors';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, TOrder } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import { calcOrderSum } from './order-details';

interface FeedOrderProps {
	order: TOrder;
}

export const Order: FC<FeedOrderProps> = ({ order }) => {
	const { ingredients } = useAppSelector(getIngredients);
	const orderIngredients = order.ingredients
		.map((id) => ingredients.find((ingredient) => ingredient._id === id))
		.filter((ingredient): ingredient is Ingredient => ingredient !== undefined);

	const distinctIngredients = Array.from(new Set(orderIngredients));

	const maxImages = 6;
	const displayedIngredients = distinctIngredients.slice(0, maxImages - 1);
	const extraCount = distinctIngredients.length - (maxImages - 1);

	return (
		<div className={styles.order} style={{ color: 'white' }}>
			<div className={styles.first_line}>
				<div className='text text_type_digits-default'>#{order.number}</div>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(order.createdAt)}
				/>
			</div>
			<div className='text text_type_main-medium'>{order.name}</div>
			<div className={styles.last_line}>
				<div className={styles.images}>
					{displayedIngredients.map((ingredient, index) => (
						<img
							key={index}
							style={{
								marginLeft: index === 0 ? 0 : -16,
								zIndex: maxImages - index,
							}}
							className={styles.image}
							src={ingredient.image}
							alt={ingredient.name}
						/>
					))}
					{extraCount > 0 && (
						<div
							className={`${styles.image} text text_type_digits-default`}
							style={{ marginLeft: -16, zIndex: 0 }}>
							+{extraCount}
						</div>
					)}
				</div>
				<div className={styles.sum}>
					<div className='text text_type_digits-default'>
						{calcOrderSum(orderIngredients)}
					</div>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export const FeedOrder: FC<FeedOrderProps> = ({ order }) => {
	const location = useLocation();

	return (
		<Link
			key={order._id}
			to={`/feed/${order.number}`}
			state={{ background: location }}>
			<Order order={order} />
		</Link>
	);
};

export const ProfileOrder: FC<FeedOrderProps> = ({ order }) => {
	const location = useLocation();

	return (
		<Link
			key={order._id}
			to={`/profile/orders/${order.number}`}
			state={{ background: location }}>
			<Order order={order} />
		</Link>
	);
};
