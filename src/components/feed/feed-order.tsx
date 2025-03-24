import React, { FC } from 'react';
import styles from './feed.module.css';
import { useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/selectors';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Order } from '../../types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface FeedOrderProps {
	order: Order;
}
export const FeedOrder: FC<FeedOrderProps> = ({ order }) => {
	const { ingredients } = useAppSelector(getIngredients);
	const orderIngredients = ingredients.filter((ingredient) =>
		order.ingredients.includes(ingredient._id)
	);
	const location = useLocation();

	const maxImages = 6;
	const displayedIngredients = orderIngredients.slice(0, maxImages - 1);
	const extraCount = orderIngredients.length - (maxImages - 1);

	return (
		<Link
			key={order._id}
			to={`/feed/${order._id}`}
			state={{ background: location }}>
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
						<div className='text text_type_digits-default'>{order.sum}</div>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};
