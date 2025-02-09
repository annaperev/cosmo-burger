import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
} from './actions';
import { Dispatch } from 'redux';
import { BASE_URL } from '../../constants';

const API_URL = BASE_URL + '/ingredients';
export const fetchIngredients = () => async (dispatch: Dispatch) => {
	dispatch({ type: GET_INGREDIENTS });

	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
		const data = await response.json();
		dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
	} catch (error: any) {
		dispatch({ type: GET_INGREDIENTS_FAILED, payload: error.message });
	}
};
