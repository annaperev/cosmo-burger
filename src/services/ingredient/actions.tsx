import { Ingredient } from '../../types';

export const OPEN_MODAL_INGREDIENT: 'OPEN_MODAL_INGREDIENT' =
	'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_MODAL_INGREDIENT' =
	'CLOSE_MODAL_INGREDIENT';

export interface IOpenModalIngredientAction {
	readonly type: typeof OPEN_MODAL_INGREDIENT;
	payload: Ingredient;
}

export interface ICloseModalIngredientAction {
	readonly type: typeof CLOSE_MODAL_INGREDIENT;
}

export type TIngredientActions =
	| IOpenModalIngredientAction
	| ICloseModalIngredientAction;
