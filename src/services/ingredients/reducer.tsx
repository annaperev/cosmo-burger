import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
} from './actions';
import { Ingredient } from '../../types';

const initialState = {
	ingredients: [],
	isFetching: false,
	isFailed: false,
};

export type IngredientsState = {
	isFetching: boolean;
	isFailed: boolean;
	ingredients: Ingredient[];
};

export const ingredientsReducer = (
	state = initialState,
	action: { type: string; payload: Ingredient[] }
): IngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS:
			return {
				...state,
				isFailed: false,
				isFetching: true,
			};
		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				isFailed: false,
				isFetching: false,
				ingredients: action.payload || [],
			};
		case GET_INGREDIENTS_FAILED:
			return {
				...state,
				isFailed: true,
				isFetching: false,
			};
		default:
			return state;
	}
};
