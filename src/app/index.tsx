import styles from './app.module.scss';

import { AppHeader } from '../components/app-header/app-header';
import React from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

export const App = () => {
	return (
		<div className={styles.container}>
			<AppHeader className={styles.header} />
			<main className={styles.content}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</div>
	);
};
