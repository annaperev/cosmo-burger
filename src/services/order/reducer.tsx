import {
	POST_ORDER_FAILED,
	POST_ORDER,
	POST_ORDER_SUCCESS,
	EMPTY_ORDER_NUMBER,
} from './actions';

const initialState = {
	orderIngredientsIds: [],
	orderNumber: null,
	isPosting: false,
	isFailed: false,
};

export type OrderState = {
	orderIngredientsIds: string[];
	orderNumber: string | null;
	isPosting: boolean;
	isFailed: boolean;
};

export const orderReducer = (
	state = initialState,
	action: {
		type: string;
		payload: OrderState;
	}
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
		default:
			return state;
	}
};
