import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { orderReducer } from './order/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';
import { ingredientReducer } from './ingredient/reducer';

export const reducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
});

export type RootState = ReturnType<typeof reducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(
	reducer,
	{},
	composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
