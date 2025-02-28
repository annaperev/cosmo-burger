import {
	ADD_BUN,
	ADD_CONSTRUCTOR_INGREDIENT,
	REMOVE_CONSTRUCTOR_INGREDIENT,
	REORDER_INGREDIENTS,
} from './actions';
import { Ingredient } from '../../types';

const initialState = {
	bun: null,
	ingredients: [],
};

export type BurgerConstructorState = {
	bun: Ingredient | null;
	ingredients: Ingredient[];
};

export const burgerConstructorReducer = (
	state = initialState,
	action: { type: string; payload: any }
): BurgerConstructorState => {
	switch (action.type) {
		case ADD_BUN:
			return {
				...state,
				bun: action.payload,
			};
		case ADD_CONSTRUCTOR_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload],
			};
		case REMOVE_CONSTRUCTOR_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(ingredient: Ingredient) => ingredient.key !== action.payload.key
				),
			};
		case REORDER_INGREDIENTS: {
			const updatedIngredients = [...action.payload.ingredients];
			const draggedItem = updatedIngredients[action.payload.dragIndex];
			updatedIngredients.splice(action.payload.dragIndex, 1);
			updatedIngredients.splice(action.payload.hoverIndex, 0, draggedItem);
			return {
				...state,
				ingredients: updatedIngredients,
			};
		}
		case 'CLEAR_CONSTRUCTOR':
			return {
				...state,
				bun: null,
				ingredients: [],
			};
		default:
			return state;
	}
};
