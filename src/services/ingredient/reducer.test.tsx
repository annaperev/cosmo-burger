import { ingredientReducer, initialState } from './reducer';
import { OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT } from './actions';
import { Ingredient } from '../../types';

const mockIngredient: Ingredient = {
	_id: 'test_60d3b41abdacab0026a733c6',
	name: 'Test Ingredient',
	type: 'test',
	proteins: 10,
	fat: 10,
	carbohydrates: 10,
	calories: 100,
	price: 100,
	image: 'https://test-image.png',
	image_mobile: 'https://test-image-mobile.png',
	image_large: 'https://test-image-large.png',
	__v: 0,
};

describe('ingredientReducer', () => {
	it('should return the initial state', () => {
		const state = ingredientReducer(undefined, { type: 'TEST_ACTION' } as any);
		expect(state).toEqual(initialState);
	});

	it('should handle OPEN_MODAL_INGREDIENT', () => {
		const action = {
			type: OPEN_MODAL_INGREDIENT,
			payload: mockIngredient,
		};
		const expectedState = {
			ingredient: mockIngredient,
		};
		expect(ingredientReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle CLOSE_MODAL_INGREDIENT', () => {
		const stateWithIngredient = {
			ingredient: mockIngredient,
		};
		const action = {
			type: CLOSE_MODAL_INGREDIENT,
		};
		expect(
			ingredientReducer(stateWithIngredient as any, action as any)
		).toEqual(initialState);
	});
});
