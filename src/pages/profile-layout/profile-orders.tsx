import styles from '../../components/feed/feed.module.css';
import { ProfileOrder } from '../../components/feed/order';
import { useEffect } from 'react';
import { SERVER_URL_ORDERS } from '../../app';
import { FeedResponse } from '../../types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getFeedProfile } from '../../services/feed-profile/slice';
import {
	connectProfile,
	disconnectProfile,
} from '../../services/feed-profile/actions';

export const Orders = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(connectProfile(SERVER_URL_ORDERS));
		return () => {
			dispatch(disconnectProfile());
		};
	}, []);
	const feed: FeedResponse = useAppSelector(getFeedProfile);
	const orders = feed.orders.slice(0, 50);

	return (
		<div className={styles.orders}>
			{orders.map((order) => (
				<ProfileOrder key={order._id} order={order} />
			))}
		</div>
	);
};
