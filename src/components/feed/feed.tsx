import { FeedOrder } from './feed-order';
import styles from './feed.module.css';
import { FeedInfo } from './feed-info';
import { Order } from '../../types';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredients/thunk-get-ingredients';

export const Feed = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

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

export const orders: Order[] = [
	{
		ingredients: [
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa094a',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa093e',
			'643d69a5c3f7b9001cfa0942',
		],
		_id: 'ssgfdg',
		status: 'done',
		number: '034535',
		createdAt: '2021-06-23T14:43:22.587Z',
		updatedAt: '2021-06-23T14:43:22.603Z',
		name: 'Death Star Starship Main бургер',
		sum: 480,
	},
	{
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa093f',
		],
		_id: 'wreeg',
		status: 'done',
		number: '034533',
		createdAt: '2021-06-23T14:43:22.587Z',
		updatedAt: '2021-06-23T14:43:22.603Z',
		name: 'Black Hole Singularity острый бургер',
		sum: 430,
	},
	{
		ingredients: [
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0947',
			'643d69a5c3f7b9001cfa0949',
			'643d69a5c3f7b9001cfa094a',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa093e',
			'643d69a5c3f7b9001cfa0942',
		],
		_id: 'ssgfdg',
		status: 'done',
		number: '034535',
		createdAt: '2021-06-23T14:43:22.587Z',
		updatedAt: '2021-06-23T14:43:22.603Z',
		name: 'Death Star Starship Main бургер',
		sum: 480,
	},
	{
		ingredients: [
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa0945',
			'643d69a5c3f7b9001cfa0947',
			'643d69a5c3f7b9001cfa0949',
			'643d69a5c3f7b9001cfa094a',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa093e',
			'643d69a5c3f7b9001cfa0942',
		],
		_id: 'ssgfdg',
		status: '',
		number: '034535',
		createdAt: '2021-06-23T14:43:22.587Z',
		updatedAt: '2021-06-23T14:43:22.603Z',
		name: 'Death Star Starship Main бургер',
		sum: 480,
	},
];
