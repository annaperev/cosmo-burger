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
			payload: { bun: mockBun } as BurgerConstructorState,
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
			bun: { ...mockBun, _id: 'old_bun_id', name: 'Old Bun' },
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
			ingredients: [mockIngredientMain1],
		};
		expect(burgerConstructorReducer(initialState, addAction1 as any)).toEqual(
			stateAfterFirstAdd
		);

		const addAction2 = {
			type: ADD_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: mockIngredientSauce1,
			} as BurgerConstructorState,
		};
		const stateAfterSecondAdd: BurgerConstructorState = {
			...stateAfterFirstAdd,
			ingredients: [mockIngredientMain1, mockIngredientSauce1],
		};
		expect(
			burgerConstructorReducer(stateAfterFirstAdd, addAction2 as any)
		).toEqual(stateAfterSecondAdd);
	});

	it(`should handle ${REMOVE_CONSTRUCTOR_INGREDIENT}`, () => {
		const ingredientToRemove = mockIngredientSauce1;
		const currentState: BurgerConstructorState = {
			...initialState,
			ingredients: [
				mockIngredientMain1,
				ingredientToRemove,
				mockIngredientMain2,
			],
		};

		const removeAction = {
			type: REMOVE_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: { key: ingredientToRemove.key },
			} as BurgerConstructorState,
		};

		const expectedState: BurgerConstructorState = {
			...initialState,
			ingredients: [mockIngredientMain1, mockIngredientMain2],
		};
		expect(burgerConstructorReducer(currentState, removeAction as any)).toEqual(
			expectedState
		);

		const removeNonExistentAction = {
			type: REMOVE_CONSTRUCTOR_INGREDIENT,
			payload: {
				ingredient: { key: 'non_existent_key' },
			} as BurgerConstructorState,
		};
		expect(
			burgerConstructorReducer(currentState, removeNonExistentAction as any)
		).toEqual(currentState);

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
		expect(
			burgerConstructorReducer(stateWithOne, removeLastAction as any)
		).toEqual(initialState);
	});

	it(`should handle ${REORDER_INGREDIENTS}`, () => {
		const ingredientsList: Ingredient[] = [
			mockIngredientMain1,
			mockIngredientSauce1,
			mockIngredientMain2,
		];
		const currentState: BurgerConstructorState = {
			...initialState,
			ingredients: ingredientsList,
		};

		const dragIndexDown = 0;
		const hoverIndexDown = 1;
		const actionMoveDown = {
			type: REORDER_INGREDIENTS,
			payload: {
				ingredients: ingredientsList,
				dragIndex: dragIndexDown,
				hoverIndex: hoverIndexDown,
			} as BurgerConstructorState,
		};
		const expectedStateMoveDown: BurgerConstructorState = {
			...initialState,
			ingredients: [
				mockIngredientSauce1,
				mockIngredientMain1,
				mockIngredientMain2,
			],
		};
		expect(
			burgerConstructorReducer(currentState, actionMoveDown as any)
		).toEqual(expectedStateMoveDown);

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
		expect(burgerConstructorReducer(currentState, actionMoveUp as any)).toEqual(
			expectedStateMoveUp
		);

		const actionNoMove = {
			type: REORDER_INGREDIENTS,
			payload: {
				ingredients: ingredientsList,
				dragIndex: 1,
				hoverIndex: 1,
			} as BurgerConstructorState,
		};
		expect(burgerConstructorReducer(currentState, actionNoMove as any)).toEqual(
			currentState
		);
	});

	it(`should handle ${CLEAR_CONSTRUCTOR}`, () => {
		const currentState: BurgerConstructorState = {
			bun: mockBun,
			ingredient: mockEmptyIngredient,
			ingredients: [mockIngredientMain1, mockIngredientSauce1],
			dragIndex: 5,
			hoverIndex: 10,
		};

		const clearAction = {
			type: CLEAR_CONSTRUCTOR,
			payload: {} as BurgerConstructorState,
		};

		const expectedState: BurgerConstructorState = {
			...currentState,
			bun: null,
			ingredients: [],
		};

		expect(burgerConstructorReducer(currentState, clearAction as any)).toEqual(
			expectedState
		);

		expect(burgerConstructorReducer(initialState, clearAction as any)).toEqual(
			initialState
		);
	});
});
