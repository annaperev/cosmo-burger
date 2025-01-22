import styles from './app.module.scss';

import { AppHeader } from '../components/app-header/app-header';
import React from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { useFetch } from './utils/hooks/useFetch';

export const App = () => {
	const url = 'https://norma.nomoreparties.space/api/ingredients';

	const { responseData, isLoading, hasError } = useFetch(url);

	return (
		<div className={styles.container}>
			<AppHeader className={styles.header} />
			<main className={styles.content}>
				{isLoading && <p>Loading...</p>}
				{hasError && <p>Error loading data. Please try again later.</p>}
				{!isLoading && !hasError && (
					<>
						<BurgerIngredients ingredients={responseData.data} />
						<BurgerConstructor ingredients={responseData.data} />
					</>
				)}
			</main>
		</div>
	);
};
