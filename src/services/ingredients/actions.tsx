import { Ingredient } from '../../types';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsAction {
	readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	payload: { ingredients: Ingredient[] };
}

export interface IGetIngredientsFailedAction {
	readonly type: typeof GET_INGREDIENTS_FAILED;
	payload: { error: string };
}

export type TIngredientsActions =
	| IGetIngredientsAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsFailedAction;
