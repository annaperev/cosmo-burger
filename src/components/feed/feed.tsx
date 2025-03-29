import { FeedOrder } from './order';
import styles from './feed.module.css';
import { FeedInfo } from './feed-info';
import { FeedResponse } from '../../types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredients/thunk-get-ingredients';
import { connect, disconnect } from '../../services/feed/actions';
import { getFeed } from '../../services/feed/slice';
import { SERVER_URL_ALL_ORDERS } from '../../app';

export const Feed = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	useEffect(() => {
		dispatch(connect(SERVER_URL_ALL_ORDERS));
		return () => {
			dispatch(disconnect());
		};
	}, []);

	const feed: FeedResponse = useAppSelector(getFeed);

	const orders = feed.orders.slice(0, 50);

	return (
		<div>
			<p className='text text_type_main-large mb-4'>Лента заказов</p>
			<div className={styles.feed}>
				<div className={styles.orders}>
					{orders.map((order) => (
						<FeedOrder key={order._id} order={order} />
					))}
				</div>
				<FeedInfo orders={orders} />
			</div>
		</div>
	);
};
