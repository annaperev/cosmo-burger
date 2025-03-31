import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
	TIngredientsActions,
} from './actions';
import { Ingredient } from '../../types';

const initialState = {
	ingredients: [],
	isFetching: false,
	isFailed: false,
	error: '',
};

export type IngredientsState = {
	isFetching: boolean;
	isFailed: boolean;
	ingredients: Ingredient[];
	error: string;
};

export const ingredientsReducer = (
	state = initialState,
	action: TIngredientsActions
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
				ingredients: action.payload.ingredients || [],
			};
		case GET_INGREDIENTS_FAILED:
			return {
				...state,
				isFailed: true,
				isFetching: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
