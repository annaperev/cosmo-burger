import {
	SET_IS_AUTH_CHECKED,
	SET_USER,
	LOG_IN,
	LOG_OUT,
	TAuthAction,
} from './actions';

export const initialState = {
	user: null,
	isAuthChecked: false,
};

export type User = {
	name: string;
	email: string;
	password?: string;
};

export type AuthState = {
	user: User | null;
	isAuthChecked: boolean;
};
export const authReducer = (
	state = initialState,
	action: TAuthAction
): AuthState => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				user: action.payload.user,
				isAuthChecked: true,
			};
		case LOG_OUT:
			return {
				...state,
				user: null,
				isAuthChecked: true,
			};
		case SET_USER:
			return {
				...state,
				user: action.payload.user,
			};
		case SET_IS_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload.isAuthChecked,
			};
		default:
			return state;
	}
};
