import { POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILED } from './actions';
import { Ingredient } from '../../types';
import { request } from '../../utils/request-helper';
import { CLEAR_CONSTRUCTOR } from '../burger-constructor/actions';
import { AppDispatch } from '../store';

interface OrderResponse {
	success: boolean;
	order: { number: string };
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
			const data = await request<OrderResponse>('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: orderIngredientsIds }),
			});
			await new Promise((resolve) => setTimeout(resolve, 5000));
			dispatch({
				type: POST_ORDER_SUCCESS,
				payload: { orderNumber: data.order.number },
			});
			dispatch({ type: CLEAR_CONSTRUCTOR });
		} catch (error: any) {
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};
