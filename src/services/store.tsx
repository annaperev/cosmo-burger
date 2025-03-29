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
import { feedSlice } from './feed/slice';
import {
	connect,
	disconnect,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
	TFeedActions,
} from './feed/actions';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connectProfile,
	disconnectProfile,
	onCloseProfile,
	onConnectingProfile,
	onErrorProfile,
	onMessageProfile,
	onOpenProfile,
	TFeedProfileActions,
} from './feed-profile/actions';
import { feedProfileSlice } from './feed-profile/slice';

export const reducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	auth: authReducer,
	feed: feedSlice.reducer,
	feedProfile: feedProfileSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const feedMiddleware = socketMiddleware({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onError,
	onMessage,
	onClose,
});

const feedProfileMiddleware = socketMiddleware(
	{
		connect: connectProfile,
		disconnect: disconnectProfile,
		onConnecting: onConnectingProfile,
		onOpen: onOpenProfile,
		onError: onErrorProfile,
		onMessage: onMessageProfile,
		onClose: onCloseProfile,
	},
	true
);

export const store = createStore(
	reducer,
	{},
	composeWithDevTools(
		applyMiddleware(thunk, feedMiddleware, feedProfileMiddleware)
	)
);

export type TApplicationActions =
	| TAuthAction
	| TBurgerConstructorActions
	| TIngredientActions
	| TIngredientsActions
	| TOrderActions
	| TFeedActions
	| TFeedProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, void, TApplicationActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
