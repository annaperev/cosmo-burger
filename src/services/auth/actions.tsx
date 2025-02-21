import { User } from './reducers';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const SET_USER = 'SET_USER';

export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export const setIsAuthChecked = (isAuthChecked: boolean) => ({
	type: SET_IS_AUTH_CHECKED,
	payload: isAuthChecked,
});

export const setUser = (user: User) => ({
	type: SET_USER,
	payload: user,
});
