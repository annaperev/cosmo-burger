import { initialState, orderReducer } from './reducer';
import {
	POST_ORDER,
	POST_ORDER_SUCCESS,
	POST_ORDER_FAILED,
	EMPTY_ORDER_NUMBER,
	SET_ORDER,
} from './actions';
import { TOrder } from '../../types';

const mockOrderNumber = '123456';
const mockOrder: TOrder = {
	_id: 'order123',
	number: 123456,
	name: 'Test Order',
	status: 'done',
	createdAt: '2025-04-13T12:00:00.000Z',
	updatedAt: '2025-04-13T12:00:00.000Z',
	ingredients: ['ingredient1', 'ingredient2'],
};

describe('orderReducer', () => {
	it('should return the initial state', () => {
		const state = orderReducer(undefined, { type: 'TEST_ACTION' } as any);
		expect(state).toEqual(initialState);
	});

	it('should handle POST_ORDER', () => {
		const action = {
			type: POST_ORDER,
		};
		const expectedState = {
			...initialState,
			isPosting: true,
		};
		expect(orderReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle POST_ORDER_SUCCESS', () => {
		const postingState = {
			...initialState,
			isPosting: true,
		};
		const action = {
			type: POST_ORDER_SUCCESS,
			payload: { orderNumber: mockOrderNumber },
		};
		const expectedState = {
			...initialState,
			orderNumber: mockOrderNumber,
		};
		expect(orderReducer(postingState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle POST_ORDER_FAILED', () => {
		const postingState = {
			...initialState,
			isPosting: true,
		};
		const action = {
			type: POST_ORDER_FAILED,
		};
		const expectedState = {
			...initialState,
			orderNumber: null,
			isFailed: true,
			isPosting: false,
		};
		expect(orderReducer(postingState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle EMPTY_ORDER_NUMBER', () => {
		const stateWithOrderNumber = {
			...initialState,
			orderNumber: mockOrderNumber,
		};
		const action = {
			type: EMPTY_ORDER_NUMBER,
		};
		const expectedState = {
			...initialState,
			orderNumber: null,
		};
		expect(orderReducer(stateWithOrderNumber as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle SET_ORDER', () => {
		const action = {
			type: SET_ORDER,
			payload: { order: mockOrder },
		};
		const expectedState = {
			...initialState,
			order: mockOrder,
		};
		expect(orderReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});
});
