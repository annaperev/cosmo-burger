import {
	burgerConstructorReducer,
	BurgerConstructorState,
	initialState,
} from './reducer';
import {
	ADD_BUN,
	ADD_CONSTRUCTOR_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	REMOVE_CONSTRUCTOR_INGREDIENT,
	REORDER_INGREDIENTS,
} from './actions';
import { Ingredient } from '../../types';

import {
	mockBun,
	mockIngredientMain1,
	mockIngredientSauce1,
	mockIngredientMain2,
	mockEmptyIngredient,
} from './mock-data';

describe('burgerConstructorReducer', () => {
	// Test initial state integrity
	it('initialized correctly', () => {
		const state = burgerConstructorReducer(undefined, {
			type: '',
			payload: initialState,
		});
		expect(state).toEqual(initialState);
	});

	it('should handle ADD_BUN reducer', () => {
		const action = {
			type: ADD_BUN,
			payload: { bun: mockBun } as BurgerConstructorState, // Cast needed because payload expects full state
		};
		const expectedState: BurgerConstructorState = {
			...initialState,
			bun: mockBun,
		};
		expect(burgerConstructorReducer(initialState, action)).toEqual(
			expectedState
		);

		const stateWithOldBun: BurgerConstructorState = {
			...initialState,
			bun: { ...mockBun, _id: 'old_bun_id', name: 'Old Bun' }, // Simulate a different bun
		};
		expect(burgerConstructorReducer(stateWithOldBun, action as any)).toEqual(
			expectedState
		);
	});

	it('should handle ADD_CONSTRUCTOR_INGREDIENT reducer', () => {
		const addAction1 = {
			type: ADD_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: mockIngredientMain1,
			} as BurgerConstructorState,
		};
		const stateAfterFirstAdd: BurgerConstructorState = {
			...initialState,
			ingredients: [mockIngredientMain1], // Expecting the typed mock ingredient
		};
		expect(burgerConstructorReducer(initialState, addAction1 as any)).toEqual(
			stateAfterFirstAdd
		);

		// Action to add a second ingredient
		const addAction2 = {
			type: ADD_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: mockIngredientSauce1,
			} as BurgerConstructorState,
		};
		const stateAfterSecondAdd: BurgerConstructorState = {
			...stateAfterFirstAdd,
			ingredients: [mockIngredientMain1, mockIngredientSauce1], // Append the second ingredient
		};
		expect(
			burgerConstructorReducer(stateAfterFirstAdd, addAction2 as any)
		).toEqual(stateAfterSecondAdd);
	});

	// --- Test REMOVE_CONSTRUCTOR_INGREDIENT ---
	it(`should handle ${REMOVE_CONSTRUCTOR_INGREDIENT}`, () => {
		// Start with a state containing multiple ingredients
		const ingredientToRemove = mockIngredientSauce1; // The one we target
		const currentState: BurgerConstructorState = {
			...initialState,
			ingredients: [
				mockIngredientMain1,
				ingredientToRemove,
				mockIngredientMain2,
			],
		};

		// Action requires the key of the ingredient to remove within the payload structure
		const removeAction = {
			type: REMOVE_CONSTRUCTOR_INGREDIENT,
			// Payload needs the ingredient structure with at least the key property
			payload: {
				ingredient: { key: ingredientToRemove.key },
			} as BurgerConstructorState,
		};

		// Expected state after removal
		const expectedState: BurgerConstructorState = {
			...initialState,
			ingredients: [mockIngredientMain1, mockIngredientMain2], // Sauce should be gone
		};
		expect(burgerConstructorReducer(currentState, removeAction as any)).toEqual(
			expectedState
		);

		// Test removing an item that doesn't exist (using a non-matching key)
		const removeNonExistentAction = {
			type: REMOVE_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: { key: 'non_existent_key' },
			} as BurgerConstructorState,
		};
		// State should remain unchanged
		expect(
			burgerConstructorReducer(currentState, removeNonExistentAction as any)
		).toEqual(currentState);

		// Test removing the only item
		const stateWithOne: BurgerConstructorState = {
			...initialState,
			ingredients: [mockIngredientMain1],
		};
		const removeLastAction = {
			type: REMOVE_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: { key: mockIngredientMain1.key },
			} as BurgerConstructorState,
		};
		// Expect state to revert to having an empty ingredients array
		expect(
			burgerConstructorReducer(stateWithOne, removeLastAction as any)
		).toEqual(initialState);
	});

	// --- Test REORDER_INGREDIENTS ---
	it(`should handle ${REORDER_INGREDIENTS}`, () => {
		// Typed list of ingredients for the test
		const ingredientsList: Ingredient[] = [
			mockIngredientMain1,
			mockIngredientSauce1,
			mockIngredientMain2,
		];
		const currentState: BurgerConstructorState = {
			...initialState,
			ingredients: ingredientsList,
		};

		// Test moving item from index 0 to index 1
		const dragIndexDown = 0;
		const hoverIndexDown = 1;
		const actionMoveDown = {
			type: REORDER_INGREDIENTS,
			payload: {
				ingredients: ingredientsList, // Reducer uses the ingredients from payload
				dragIndex: dragIndexDown,
				hoverIndex: hoverIndexDown,
			} as BurgerConstructorState,
		};
		const expectedStateMoveDown: BurgerConstructorState = {
			...initialState,
			// Expected order: Sauce, Main1, Main2
			ingredients: [
				mockIngredientSauce1,
				mockIngredientMain1,
				mockIngredientMain2,
			],
		};
		expect(
			burgerConstructorReducer(currentState, actionMoveDown as any)
		).toEqual(expectedStateMoveDown);

		// Test moving item from index 2 to index 0
		const dragIndexUp = 2;
		const hoverIndexUp = 0;
		const actionMoveUp = {
			type: REORDER_INGREDIENTS,
			payload: {
				ingredients: ingredientsList, // Use original list again for payload
				dragIndex: dragIndexUp,
				hoverIndex: hoverIndexUp,
			} as BurgerConstructorState,
		};
		const expectedStateMoveUp: BurgerConstructorState = {
			...initialState,
			// Expected order: Main2, Main1, Sauce
			ingredients: [
				mockIngredientMain2,
				mockIngredientMain1,
				mockIngredientSauce1,
			],
		};
		// Use the original currentState for this independent reorder test
		expect(burgerConstructorReducer(currentState, actionMoveUp as any)).toEqual(
			expectedStateMoveUp
		);

		// Test reordering with identical indices (should not change order)
		const actionNoMove = {
			type: REORDER_INGREDIENTS,
			payload: {
				ingredients: ingredientsList,
				dragIndex: 1,
				hoverIndex: 1,
			} as BurgerConstructorState,
		};
		// Expect the state to be identical to the initial currentState for this test
		expect(burgerConstructorReducer(currentState, actionNoMove as any)).toEqual(
			currentState
		);
	});

	// --- Test CLEAR_CONSTRUCTOR ---
	it(`should handle ${CLEAR_CONSTRUCTOR}`, () => {
		// Start with a populated state
		const currentState: BurgerConstructorState = {
			bun: mockBun,
			ingredient: mockEmptyIngredient, // Should remain unchanged based on reducer logic
			ingredients: [mockIngredientMain1, mockIngredientSauce1],
			dragIndex: 5, // Other fields should be preserved
			hoverIndex: 10,
		};

		// Action doesn't need a specific payload content, but structure needs casting
		const clearAction = {
			type: CLEAR_CONSTRUCTOR,
			payload: {} as BurgerConstructorState, // Empty payload object cast
		};

		// Expected state after clearing bun and ingredients
		const expectedState: BurgerConstructorState = {
			...currentState, // Preserve other fields like dragIndex/hoverIndex, ingredient
			bun: null, // Bun is cleared
			ingredients: [], // Ingredients array is emptied
		};

		expect(burgerConstructorReducer(currentState, clearAction as any)).toEqual(
			expectedState
		);

		// Test clearing an already empty constructor
		// Use the defined initialState which is already clear
		expect(burgerConstructorReducer(initialState, clearAction as any)).toEqual(
			initialState
		);
	});
});
