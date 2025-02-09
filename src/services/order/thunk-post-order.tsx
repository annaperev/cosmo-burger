import { POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILED } from './actions';
import { Dispatch } from 'redux';
import { Ingredient } from '../../types';
import { request } from '../../utils/request-helper';

export const postOrder =
	({ bun, ingredients }: { bun: Ingredient; ingredients: Ingredient[] }) =>
	async (dispatch: Dispatch) => {
		const orderIngredientsIds = [
			bun._id,
			...ingredients.map((ing) => ing._id),
			bun._id,
		];
		dispatch({ type: POST_ORDER });
		try {
			const data = await request('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: orderIngredientsIds }),
			});
			dispatch({
				type: POST_ORDER_SUCCESS,
				payload: data.order.number,
			});
		} catch (error: any) {
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};
