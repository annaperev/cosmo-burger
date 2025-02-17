import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { Modal } from '../components/common/modal/modal';
import styles from '../pages/home/home.module.css';
import { AppHeader } from '../components/app-header/app-header';
import { NotFound404 } from '../pages/not-found-404/not-found-404';
import { Login } from '../pages/login/login';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		// Возвращаемся к предыдущему пути при закрытии модалки
		navigate(-1);
	};

	return (
		<div className={styles.container}>
			<AppHeader className={styles.header} />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route path='*' element={<NotFound404 />} />
				<Route path='/login' element={<Login />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal header='Детали ингридиента' onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
