import { SET_IS_AUTH_CHECKED, SET_USER, LOG_IN, LOG_OUT } from './actions';

const initialState = {
	user: {
		name: '',
		email: '',
	},
	isAuthChecked: false,
};

export type User = {
	name: string;
	email: string;
};

export type AuthState = {
	user: User;
	isAuthChecked: boolean;
};
export const authReducer = (
	state = initialState,
	action: { type: string; payload: any }
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
				user: initialState.user,
				isAuthChecked: true,
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_IS_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};
		default:
			return state;
	}
};
