import {
	POST_ORDER_FAILED,
	POST_ORDER,
	POST_ORDER_SUCCESS,
	EMPTY_ORDER_NUMBER,
	TOrderActions,
	SET_ORDER,
} from './actions';
import { TOrder } from '../../types';

const initialState = {
	orderIngredientsIds: [],
	orderNumber: null,
	order: null,
	isPosting: false,
	isFailed: false,
};

export type OrderState = {
	orderIngredientsIds: string[];
	orderNumber: string | null;
	order: TOrder | null;
	isPosting: boolean;
	isFailed: boolean;
};

export const orderReducer = (
	state = initialState,
	action: TOrderActions
): OrderState => {
	switch (action.type) {
		case POST_ORDER:
			return {
				...state,
				isFailed: false,
				isPosting: true,
			};
		case POST_ORDER_SUCCESS:
			return {
				...state,
				orderNumber: action.payload.orderNumber,
				isFailed: false,
				isPosting: false,
			};
		case POST_ORDER_FAILED:
			return {
				...state,
				orderNumber: null,
				isFailed: true,
				isPosting: false,
			};
		case EMPTY_ORDER_NUMBER:
			return {
				...state,
				orderNumber: null,
			};
		case SET_ORDER:
			return {
				...state,
				order: action.payload.order,
			};
		default:
			return state;
	}
};
