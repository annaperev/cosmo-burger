import { authReducer, initialState, User } from './reducers';
import { SET_IS_AUTH_CHECKED, SET_USER, LOG_IN, LOG_OUT } from './actions';

const mockUser: User = {
	name: 'Test User',
	email: 'test@example.com',
};

describe('authReducer', () => {
	it('should return the initial state', () => {
		const action = { type: 'TEST_ACTION' } as any;
		const state = authReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('should handle LOG_IN', () => {
		const action = {
			type: LOG_IN,
			payload: { user: mockUser },
		};
		const expectedState = {
			user: mockUser,
			isAuthChecked: true,
		};
		expect(authReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle LOG_OUT', () => {
		const loggedInState = {
			user: mockUser,
			isAuthChecked: true,
		};
		const action = {
			type: LOG_OUT,
		};
		const expectedState = {
			user: null,
			isAuthChecked: true,
		};
		expect(authReducer(loggedInState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle SET_USER', () => {
		const action = {
			type: SET_USER,
			payload: { user: mockUser },
		};
		const expectedState = {
			...initialState,
			user: mockUser,
		};
		expect(authReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle SET_IS_AUTH_CHECKED', () => {
		const action = {
			type: SET_IS_AUTH_CHECKED,
			payload: { isAuthChecked: true },
		};
		const expectedState = {
			...initialState,
			isAuthChecked: true,
		};
		expect(authReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});
});
