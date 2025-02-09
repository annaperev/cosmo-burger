import { POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILED } from './actions';
import { Dispatch } from 'redux';
import { Ingredient } from '../../types';
import { BASE_URL } from '../../constants';

const API_URL = BASE_URL + '/orders';
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
			const response = await fetch(API_URL, {
				method: 'POST',
				body: JSON.stringify({ ingredients: orderIngredientsIds }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				dispatch({
					type: POST_ORDER_SUCCESS,
					payload: data.order.number,
				});
			}
		} catch (error: any) {
			console.error('Order request failed:', error);
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};
