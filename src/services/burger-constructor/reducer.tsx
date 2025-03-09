import {
	ADD_BUN,
	ADD_CONSTRUCTOR_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	REMOVE_CONSTRUCTOR_INGREDIENT,
	REORDER_INGREDIENTS,
} from './actions';
import { emptyIngredient, Ingredient } from '../../types';

const initialState = {
	bun: null,
	ingredient: emptyIngredient,
	ingredients: [],
	dragIndex: 0,
	hoverIndex: 0,
};

export type BurgerConstructorState = {
	bun: Ingredient | null;
	ingredient: Ingredient;
	ingredients: Ingredient[];
	dragIndex: number;
	hoverIndex: number;
};

export const burgerConstructorReducer = (
	state = initialState,
	action: { type: string; payload: BurgerConstructorState }
): BurgerConstructorState => {
	switch (action.type) {
		case ADD_BUN:
			return {
				...state,
				bun: action.payload.bun,
			};
		case ADD_CONSTRUCTOR_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload.ingredient],
			};
		case REMOVE_CONSTRUCTOR_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(ingredient: Ingredient) =>
						ingredient.key !== action.payload.ingredient.key
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
		case CLEAR_CONSTRUCTOR:
			return {
				...state,
				bun: null,
				ingredients: [],
			};
		default:
			return state;
	}
};
