import React from 'react';
import ingredients from '../../app/utils/data';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
	const firstBun = ingredients.find(
		(ingredient) => ingredient.type === 'bun'
	) || { name: '', price: 0, image: '' };

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
					{ingredients
						.filter((ingredient) => ingredient.type !== 'bun')
						.map((ingredient) => (
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
					<span className='text text_type_digits-medium'>610</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType={'submit'} type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
