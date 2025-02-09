import { BurgerConstructorState } from './burger-constructor/reducer';
import { IngredientState } from './ingredient/reducer';
import { IngredientsState } from './ingredients/reducer';
import { OrderState } from './order/reducer';
import { createSelector } from 'reselect';

type StoreType = {
	burgerConstructor: BurgerConstructorState;
	ingredient: IngredientState;
	ingredients: IngredientsState;
	order: OrderState;
};

export const getConstructorIngredients = (store: StoreType) =>
	store.burgerConstructor;

export const getIngredient = (store: StoreType) => store.ingredient;

export const getIngredients = (store: StoreType) => store.ingredients;

export const getOrderNumber = (store: StoreType) => store.order;

export const calcTotalSum = createSelector(
	[getConstructorIngredients],
	(burgerConstructorState) => {
		let sumWithoutBun = 0;
		burgerConstructorState.ingredients.forEach(
			(ingredient) => (sumWithoutBun += ingredient.price)
		);

		const bun = burgerConstructorState.bun;
		const totalSum = bun ? sumWithoutBun + bun.price * 2 : sumWithoutBun;
		return totalSum;
	}
);

export const calcIngredientCounter = createSelector(
	[getIngredient, getConstructorIngredients],
	(ingredientState, burgerConstructorIngredients) => {
		const ingredient = ingredientState.ingredient;
		const bun = burgerConstructorIngredients.bun;
		const ingredients = burgerConstructorIngredients.ingredients;
		let count;
		if (ingredient?.type === 'bun') {
			count = bun?._id === ingredient._id ? 2 : 0;
		} else {
			count = ingredients.filter((i) => i._id === ingredient?._id).length;
		}
		return count;
	}
);
