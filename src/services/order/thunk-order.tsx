import {
	SET_ORDER,
	POST_ORDER,
	POST_ORDER_FAILED,
	POST_ORDER_SUCCESS,
} from './actions';
import { Ingredient, TOrder } from '../../types';
import { request } from '../../utils/request-helper';
import { CLEAR_CONSTRUCTOR } from '../burger-constructor/actions';
import { AppDispatch } from '../store';

interface PostOrderResponse {
	success: boolean;
	order: { number: string };
	name: string;
}

interface OrderResponse {
	success: boolean;
	orders: TOrder[];
	name: string;
}

export const postOrder =
	({ bun, ingredients }: { bun: Ingredient; ingredients: Ingredient[] }) =>
	async (dispatch: AppDispatch) => {
		const orderIngredientsIds = [
			bun._id,
			...ingredients.map((ing) => ing._id),
			bun._id,
		];
		dispatch({ type: POST_ORDER });
		try {
			const data = await request<PostOrderResponse>('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({
					ingredients: orderIngredientsIds,
				}),
			});
			dispatch({
				type: POST_ORDER_SUCCESS,
				payload: { orderNumber: data.order.number },
			});
			dispatch({ type: CLEAR_CONSTRUCTOR });
		} catch (error: any) {
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};

export const getOrderByNumber =
	(orderNumber: string) => async (dispatch: AppDispatch) => {
		try {
			const data = await request<OrderResponse>(`orders/${orderNumber}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			dispatch({
				type: SET_ORDER,
				payload: { order: data.orders[0] },
			});
		} catch (error: any) {
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};
