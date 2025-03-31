import { User } from './reducers';

export const LOG_IN: 'LOG_IN' = 'LOG_IN';
export const LOG_OUT: 'LOG_OUT' = 'LOG_OUT';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_IS_AUTH_CHECKED: 'SET_IS_AUTH_CHECKED' = 'SET_IS_AUTH_CHECKED';

export interface ISetIsAuthCheckedAction {
	readonly type: typeof SET_IS_AUTH_CHECKED;
	payload: { isAuthChecked: boolean };
}

export interface ISetUserAction {
	readonly type: typeof SET_USER;
	payload: { user: User };
}

export interface ILogInAction {
	readonly type: typeof LOG_IN;
	payload: { user: User };
}

export interface ILogOutAction {
	readonly type: typeof LOG_OUT;
}

export type TAuthAction =
	| ISetIsAuthCheckedAction
	| ISetUserAction
	| ILogInAction
	| ILogOutAction;

export const setIsAuthChecked = (
	isAuthChecked: boolean
): ISetIsAuthCheckedAction => ({
	type: SET_IS_AUTH_CHECKED,
	payload: { isAuthChecked: isAuthChecked },
});

export const setUser = (user: User): ISetUserAction => ({
	type: SET_USER,
	payload: { user: user },
});

export const logIn = (user: User): ILogInAction => ({
	type: LOG_IN,
	payload: { user: user },
});
