import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor.module.css';
import { Ingredient } from '../../../types';

interface DraggableIngredientProps {
	ingredient: Ingredient;
	index: number;
	moveIngredient: (dragIndex: number, hoverIndex: number) => void;
	handleRemove: (ingredient: Ingredient) => void;
}

export const DraggableIngredient = ({
	ingredient,
	index,
	moveIngredient,
	handleRemove,
}: DraggableIngredientProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: 'constructor-ingredient',
		hover: (item: { index: number }) => {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;

			moveIngredient(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'constructor-ingredient',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<DragIcon type='primary' className={styles.drag_icon} />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => handleRemove(ingredient)}
			/>
		</div>
	);
};
