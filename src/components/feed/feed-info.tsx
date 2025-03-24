import styles from './feed.module.css';
import { Order } from '../../types';
import { FC } from 'react';

interface FeedInfoProps {
	orders: Order[];
}
export const FeedInfo: FC<FeedInfoProps> = ({ orders }) => {
	return (
		<div className={styles.info}>
			<div className={styles.info_first_line}>
				<div className={styles.orders_list}>
					<p className='text text_type_main-medium'>Готовы:</p>
					<div className={styles.list}>
						{orders
							.filter((order) => order.status === 'done')
							.map((order) => (
								<div
									className='text text_type_digits-default'
									style={{ color: '#00CCCC' }}
									key={order._id}>
									{order.number}
								</div>
							))}
					</div>
				</div>
				<div className={styles.orders_list}>
					<p className='text text_type_main-medium'>В работе:</p>
					<div className={styles.list}>
						{orders
							.filter((order) => order.status !== 'done')
							.map((order) => (
								<div className='text text_type_digits-default' key={order._id}>
									{order.number}
								</div>
							))}
					</div>
				</div>
			</div>
			<div className={styles.info_other_lines}>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<p className='text text_type_digits-large'>28 752</p>
			</div>
			<div className={styles.info_other_lines}>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className='text text_type_digits-large'>138</p>
			</div>
		</div>
	);
};
