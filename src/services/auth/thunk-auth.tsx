import { LOG_OUT, logIn, setIsAuthChecked, setUser } from './actions';
import { Dispatch } from 'redux';
import { request, requestWithRefresh } from '../../utils/request-helper';
import { AppDispatch } from '../store';
import { User } from './reducers';

interface UserResponse {
	success: boolean;
	user: User;
	accessToken: string;
	refreshToken: string;
}

export const registerUser =
	(email: string, password: string, name: string) =>
	async (dispatch: Dispatch) => {
		try {
			const data = await request<UserResponse>('auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email, password: password, name: name }),
			});
			dispatch(logIn(data.user));
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
		} catch (error: any) {
			console.error('Login request failed:', error);
			dispatch({ type: LOG_OUT });
		}
	};

export const login =
	(email: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const data = await request<UserResponse>('auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email, password: password }),
			});
			dispatch(logIn(data.user));
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
			return data.user;
		} catch (error: any) {
			dispatch({ type: LOG_OUT });
			console.error('Login request failed:', error);
		}
	};

interface UserLogoutResponse {
	success: boolean;
	message: string;
}
export const logout = () => async (dispatch: Dispatch) => {
	try {
		await request<UserLogoutResponse>('auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
		dispatch({ type: LOG_OUT });
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	} catch (error: any) {
		console.error('Logout request failed:', error);
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
};

export const getUserApi = async (): Promise<UserResponse> => {
	try {
		const data = await requestWithRefresh<UserResponse>('auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('accessToken') || '',
			},
		});
		return data;
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};

export const updateUserProfile =
	(name: string, email: string) => async (dispatch: Dispatch) => {
		try {
			const data = await requestWithRefresh<UserResponse>('auth/user', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('accessToken') || '',
				},
				body: JSON.stringify({ name: name, email: email }),
			});
			console.log(data.user);
			dispatch(setUser(data.user));
		} catch (error: any) {
			console.log(error);
		}
	};

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
	if (localStorage.getItem('accessToken')) {
		getUserApi()
			.then((res) => {
				dispatch(setUser(res.user));
			})
			.catch(() => {
				console.log('User is not authorized');
			})
			.finally(() => dispatch(setIsAuthChecked(true)));
	} else {
		dispatch(setIsAuthChecked(true));
	}
};
