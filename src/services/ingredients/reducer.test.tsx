import { ingredientsReducer, initialState } from './reducer';
import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from './actions';
import { Ingredient } from '../../types';

const mockIngredients: Ingredient[] = [
	{
		_id: 'ingredient1',
		name: 'Test Ingredient 1',
		type: 'main',
		proteins: 10,
		fat: 10,
		carbohydrates: 10,
		calories: 100,
		price: 100,
		image: 'https://test-image1.png',
		image_mobile: 'https://test-image-mobile1.png',
		image_large: 'https://test-image-large1.png',
		__v: 0,
	},
	{
		_id: 'ingredient2',
		name: 'Test Ingredient 2',
		type: 'sauce',
		proteins: 5,
		fat: 5,
		carbohydrates: 5,
		calories: 50,
		price: 50,
		image: 'https://test-image2.png',
		image_mobile: 'https://test-image-mobile2.png',
		image_large: 'https://test-image-large2.png',
		__v: 0,
	},
];

describe('ingredientsReducer', () => {
	it('should return the initial state', () => {
		const state = ingredientsReducer(undefined, { type: 'TEST_ACTION' } as any);
		expect(state).toEqual(initialState);
	});

	it('should handle GET_INGREDIENTS', () => {
		const action = {
			type: GET_INGREDIENTS,
		};
		const expectedState = {
			...initialState,
			isFetching: true,
		};
		expect(ingredientsReducer(initialState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle GET_INGREDIENTS_SUCCESS', () => {
		const fetchingState = {
			...initialState,
			isFetching: true,
		};
		const action = {
			type: GET_INGREDIENTS_SUCCESS,
			payload: { ingredients: mockIngredients },
		};
		const expectedState = {
			...initialState,
			isFetching: false,
			ingredients: mockIngredients,
		};
		expect(ingredientsReducer(fetchingState as any, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle GET_INGREDIENTS_FAILED', () => {
		const fetchingState = {
			...initialState,
			isFetching: true,
		};
		const errorMessage = 'Failed to fetch ingredients';
		const action = {
			type: GET_INGREDIENTS_FAILED,
			payload: { error: errorMessage },
		};
		const expectedState = {
			...initialState,
			isFetching: false,
			isFailed: true,
			error: errorMessage,
		};
		expect(ingredientsReducer(fetchingState as any, action as any)).toEqual(
			expectedState
		);
	});
});
