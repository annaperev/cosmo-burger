import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
} from './actions';
import { Dispatch } from 'redux';
import { request } from '../../utils/request-helper';

export const fetchIngredients = () => async (dispatch: Dispatch) => {
	dispatch({ type: GET_INGREDIENTS });

	try {
		const data = await request('ingredients');
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
