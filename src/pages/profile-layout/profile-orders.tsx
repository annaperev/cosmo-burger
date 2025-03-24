import { orders } from '../../components/feed/feed';
import styles from '../../components/feed/feed.module.css';
import { FeedOrder } from '../../components/feed/feed-order';

export const Orders = () => {
	return (
		<div className={styles.orders}>
			{orders.map((order) => (
				<FeedOrder key={order._id} order={order} />
			))}
		</div>
	);
};
