import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ingredientReducer } from './ingredient/reducer';
import { authReducer } from './auth/reducers';
import { TAuthAction } from './auth/actions';
import { TBurgerConstructorActions } from './burger-constructor/actions';
import { TIngredientActions } from './ingredient/actions';
import { TIngredientsActions } from './ingredients/actions';
import { TOrderActions } from './order/actions';

export const reducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(
	reducer,
	{},
	composeWithDevTools(applyMiddleware(thunk))
);

export type TApplicationActions =
	| TAuthAction
	| TBurgerConstructorActions
	| TIngredientActions
	| TIngredientsActions
	| TOrderActions;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, void, TApplicationActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
