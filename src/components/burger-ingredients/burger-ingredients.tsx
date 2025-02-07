import React, { useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	IngredientGroup,
	typeTranslations,
} from './ingredient-group/ingredient-group';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/ingredients/thunk-get-ingredients';

export const BurgerIngredients = () => {
	const [activeTab, setActiveTab] = useState(0);
	const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

	const { ingredients, isFetching, isFailed } = useAppSelector(
		(store) => store.ingredients
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(fetchIngredients());
	}, []);

	const ingredientsTypes = Array.from(
		new Set(ingredients.map((ingredient) => ingredient.type))
	);

	const handleScroll = () => {
		if (!sectionsRef.current.length) return;
		let minDistance = Number.MAX_VALUE;
		let newActiveTab = 0;

		sectionsRef.current.forEach((section, index) => {
			if (section) {
				const rect = section.getBoundingClientRect();
				const distanceFromTop = Math.abs(rect.top - 150);

				if (distanceFromTop < minDistance) {
					minDistance = distanceFromTop;
					newActiveTab = index;
				}
			}
		});
		setActiveTab(newActiveTab);
	};

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			{isFetching && <p>Loading...</p>}
			{isFailed && <p>Error loading data. Please try again later.</p>}
			{!isFetching && !isFailed && (
				<>
					<nav className={styles.component_type_tab}>
						{ingredientsTypes.map((tab, index) => (
							<Tab
								key={tab}
								active={activeTab === index}
								onClick={() => console.log('click')}
								value={tab}>
								{typeTranslations[tab]}
							</Tab>
						))}
					</nav>
					<div className={styles.list} onScroll={handleScroll}>
						{ingredientsTypes.map((type, index) => (
							<div ref={(el) => (sectionsRef.current[index] = el)}>
								<IngredientGroup
									key={type}
									type={type}
									ingredients={ingredients.filter((i) => i.type === type)}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};
