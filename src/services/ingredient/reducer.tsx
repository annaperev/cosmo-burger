import {
	CLOSE_MODAL_INGREDIENT,
	OPEN_MODAL_INGREDIENT,
	TIngredientActions,
} from './actions';
import { Ingredient } from '../../types';

const initialState = {
	ingredient: null,
};

export type IngredientState = {
	ingredient: Ingredient | null;
};

export const ingredientReducer = (
	state = initialState,
	action: TIngredientActions
): IngredientState => {
	switch (action.type) {
		case OPEN_MODAL_INGREDIENT:
			return {
				ingredient: action.payload,
			};
		case CLOSE_MODAL_INGREDIENT:
			return {
				ingredient: null,
			};
		default:
			return state;
	}
};
