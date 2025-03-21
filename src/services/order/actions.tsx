export const POST_ORDER: 'POST_ORDER' = 'POST_ORDER';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const EMPTY_ORDER_NUMBER: 'EMPTY_ORDER_NUMBER' = 'EMPTY_ORDER_NUMBER';

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

export type TOrderActions =
	| IPostOrderAction
	| IPostOrderSuccessAction
	| IPostOrderFailedAction
	| IEmptyOrderNumberAction;
