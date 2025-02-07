import { POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILED } from './actions';
import { Dispatch } from 'redux';
import axios from 'axios';
import { Ingredient } from '../../types';

const API_URL = 'https://norma.nomoreparties.space/api/orders';
export const postOrder =
	({ bun, ingredients }: { bun: Ingredient; ingredients: Ingredient[] }) =>
	async (dispatch: Dispatch) => {
		const odredIngredientsIds = [
			bun._id,
			...ingredients.map((ing) => ing._id),
			bun._id,
		];
		dispatch({ type: POST_ORDER });
		try {
			const response = await axios.post(API_URL, {
				ingredients: odredIngredientsIds,
			});
			if (response.data.success) {
				dispatch({
					type: POST_ORDER_SUCCESS,
					payload: response.data.order.number,
				});
			}
		} catch (error: any) {
			console.error('Order request failed:', error);
			dispatch({ type: POST_ORDER_FAILED, payload: error.message });
		}
	};
