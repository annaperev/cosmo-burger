import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
} from './actions';
import { Dispatch } from 'redux';
import { request } from '../../utils/request-helper';
import { Ingredient } from '../../types';

interface IngredientResponse {
	success: boolean;
	data: Ingredient[];
}
export const fetchIngredients = () => async (dispatch: Dispatch) => {
	dispatch({ type: GET_INGREDIENTS });

	try {
		const data = await request<IngredientResponse>('ingredients');
		dispatch({
			type: GET_INGREDIENTS_SUCCESS,
			payload: { ingredients: data.data },
		});
	} catch (error: any) {
		dispatch({
			type: GET_INGREDIENTS_FAILED,
			payload: { error: error.message },
		});
	}
};
