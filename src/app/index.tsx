import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { Modal } from '../components/common/modal/modal';
import styles from '../pages/home/home.module.css';
import { AppHeader } from '../components/app-header/app-header';
import { NotFound404 } from '../pages/not-found-404/not-found-404';
import { Login } from '../pages/login/login';
import { Register } from '../pages/login/register/register';
import { ForgotPassword } from '../pages/login/forgot-password/forgot-password';
import { ResetPassword } from '../pages/login/reset-password/reset-password';
import { Profile } from '../pages/profile-layout/profile';
import { ProfileLayout } from '../pages/profile-layout/profile-layout';
import { Orders } from '../pages/profile-layout/orders';
import { useAppDispatch } from '../services/store';
import { checkUserAuth } from '../services/auth/thunk-auth';
import { OnlyAuth, OnlyUnAuth } from './protected-route.';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		// Возвращаемся к предыдущему пути при закрытии модалки
		navigate(-1);
	};

	return (
		<div className={styles.container}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route path='/orders' element={<OnlyAuth component={<Orders />} />} />
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfileLayout />} />}>
					<Route
						path='profile'
						element={<OnlyAuth component={<Profile />} />}
					/>
					<Route path='orders' element={<OnlyAuth component={<Orders />} />} />
				</Route>
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
