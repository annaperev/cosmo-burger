import { Ingredient } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' =
	'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT: 'REMOVE_CONSTRUCTOR_INGREDIENT' =
	'REMOVE_CONSTRUCTOR_INGREDIENT';
export const REORDER_INGREDIENTS: 'REORDER_INGREDIENTS' = 'REORDER_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddBunAction {
	readonly type: typeof ADD_BUN;
	payload: { bun: Ingredient };
}

export interface IAddConstructorIngredientAction {
	readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
	payload: { ingredient: Ingredient };
}

export interface IRemoveConstructorIngredientAction {
	readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
	payload: { ingredient: Ingredient };
}

export interface IReorderIngredientsAction {
	readonly type: typeof REORDER_INGREDIENTS;
	payload: { ingredients: Ingredient[]; dragIndex: number; hoverIndex: number };
}

export interface IClearConstructorAction {
	readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
	| IAddBunAction
	| IAddConstructorIngredientAction
	| IRemoveConstructorIngredientAction
	| IReorderIngredientsAction
	| IClearConstructorAction;

export const addBun = (ingredient: Ingredient): IAddBunAction => ({
	type: ADD_BUN,
	payload: { bun: ingredient },
});

export const addConstructorIngredient = (
	ingredient: Ingredient
): IAddConstructorIngredientAction => ({
	type: ADD_CONSTRUCTOR_INGREDIENT,
	payload: { ingredient: { ...ingredient, key: uuidv4() } },
});
export const removeConstructorIngredient = (
	ingredient: Ingredient
): IRemoveConstructorIngredientAction => ({
	type: REMOVE_CONSTRUCTOR_INGREDIENT,
	payload: { ingredient: ingredient },
});

export const reorderIngredients = (
	ingredients: Ingredient[],
	dragIndex: number,
	hoverIndex: number
): IReorderIngredientsAction => ({
	type: REORDER_INGREDIENTS,
	payload: {
		ingredients: ingredients,
		dragIndex: dragIndex,
		hoverIndex: hoverIndex,
	},
});
