import { TOrder } from '../../types';

export const POST_ORDER: 'POST_ORDER' = 'POST_ORDER';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const EMPTY_ORDER_NUMBER: 'EMPTY_ORDER_NUMBER' = 'EMPTY_ORDER_NUMBER';

export const SET_ORDER: 'GET_ORDER_BY_NUMBER' = 'GET_ORDER_BY_NUMBER';

export interface IPostOrderAction {
	readonly type: typeof POST_ORDER;
}

export interface IPostOrderSuccessAction {
	readonly type: typeof POST_ORDER_SUCCESS;
	payload: { orderNumber: string };
}

export interface IPostOrderFailedAction {
	readonly type: typeof POST_ORDER_FAILED;
}

export interface IEmptyOrderNumberAction {
	readonly type: typeof EMPTY_ORDER_NUMBER;
}

export interface ISetOrderAction {
	readonly type: typeof SET_ORDER;
	payload: { order: TOrder };
}

export type TOrderActions =
	| IPostOrderAction
	| IPostOrderSuccessAction
	| IPostOrderFailedAction
	| IEmptyOrderNumberAction
	| ISetOrderAction;

export const setOrder = (order: TOrder): ISetOrderAction => ({
	type: SET_ORDER,
	payload: { order },
});
