import { Ingredient } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS;';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addBun = (ingredient: Ingredient) => ({
	type: ADD_BUN,
	payload: { bun: ingredient },
});

export const addConstructorIngredient = (ingredient: Ingredient) => ({
	type: ADD_CONSTRUCTOR_INGREDIENT,
	payload: { ingredient: { ...ingredient, key: uuidv4() } },
});
export const removeConstructorIngredient = (ingredient: Ingredient) => ({
	type: REMOVE_CONSTRUCTOR_INGREDIENT,
	payload: { ingredient: ingredient },
});

export const reorderIngredients = (
	ingredients: Ingredient[],
	dragIndex: number,
	hoverIndex: number
) => ({
	type: REORDER_INGREDIENTS,
	payload: {
		ingredients: ingredients,
		dragIndex: dragIndex,
		hoverIndex: hoverIndex,
	},
});
