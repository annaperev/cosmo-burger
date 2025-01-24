import React, { FC } from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Ingredient } from '../../types';
import { Modal } from '../common/modal/modal';
import { OrderDetails } from '../order-details/order-details';

export const BurgerConstructor: FC<{ ingredients: Ingredient[] }> = ({
	ingredients,
}) => {
	const firstBun = ingredients.find(
		(ingredient) => ingredient.type === 'bun'
	) || { name: '', price: 0, image: '' };

	const ingredientsWithoutBun = ingredients.filter(
		(ingredient) => ingredient.type !== 'bun'
	);

	const totalSum = ingredients.reduce((sum, item) => {
		if (item.type === 'bun') {
			return sum + item.price * 2;
		}
		return sum + item.price;
	}, 0);

	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<div className={`${styles.container} pb-4 `}>
			<span className={styles.spacer}></span>
			<div className={styles.list}>
				<ConstructorElement
					text={firstBun.name + ' (верх)'}
					type='top'
					isLocked={true}
					price={firstBun.price}
					thumbnail={firstBun.image}
					extraClass='ml-10'></ConstructorElement>
				<div className={styles.scrollable}>
					{ingredientsWithoutBun.map((ingredient) => (
						<div key={ingredient._id} className='pl-4'>
							<DragIcon type='primary' className={styles.drag_icon} />
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}></ConstructorElement>
						</div>
					))}
				</div>
				<ConstructorElement
					text={firstBun.name + ' (низ)'}
					type='bottom'
					isLocked={true}
					price={firstBun.price}
					thumbnail={firstBun.image}
					extraClass='ml-10'></ConstructorElement>
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
					onClick={toggleModal}>
					Оформить заказ
				</Button>
			</div>

			{isModalOpen && (
				<Modal header='' onClose={toggleModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
