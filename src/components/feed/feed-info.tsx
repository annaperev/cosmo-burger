import styles from './feed.module.css';
import { TOrder } from '../../types';
import { FC } from 'react';

interface FeedInfoProps {
	orders: TOrder[];
}
export const FeedInfo: FC<FeedInfoProps> = ({ orders }) => {
	const ordersDone = orders
		.filter((order) => order.status == 'done')
		.slice(0, 10);
	const ordersDoneColumn1 = ordersDone.slice(0, 5);
	const ordersDoneColumn2 = ordersDone.slice(5, 10);

	const ordersInWork = orders.filter((order) => order.status !== 'done');
	const ordersInWorkColumn1 = ordersInWork.slice(0, 5);
	const ordersInWorkColumn2 = ordersInWork.slice(5, 10);

	return (
		<div className={styles.info}>
			<div className={styles.info_first_line}>
				<div className={styles.orders_list}>
					<p className='text text_type_main-medium'>Готовы:</p>
					<div className={styles.list_row}>
						<div className={styles.list}>
							{ordersDoneColumn1?.map((order) => (
								<div
									className='text text_type_digits-default'
									style={{ color: '#00CCCC' }}
									key={order._id}>
									{order.number}
								</div>
							))}
						</div>
						<div className={styles.list}>
							{ordersDoneColumn2?.map((order) => (
								<div
									className='text text_type_digits-default'
									style={{ color: '#00CCCC' }}
									key={order._id}>
									{order.number}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={styles.orders_list}>
					<p className='text text_type_main-medium'>В работе:</p>
					<div className={styles.list_row}>
						<div className={styles.list}>
							{ordersInWorkColumn1?.map((order) => (
								<div className='text text_type_digits-default' key={order._id}>
									{order.number}
								</div>
							))}
						</div>
						<div className={styles.list}>
							{ordersInWorkColumn2?.map((order) => (
								<div className='text text_type_digits-default' key={order._id}>
									{order.number}
								</div>
							))}
						</div>
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
