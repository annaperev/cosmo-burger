import { createSlice } from '@reduxjs/toolkit';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { FeedResponse } from '../../types';

export type FeedState = {
	status: 'connecting' | 'open' | 'error' | 'close';
	feed: FeedResponse;
	error: string | null;
};

export const initialState: FeedState = {
	status: 'close',
	feed: {
		success: true,
		orders: [],
		total: 0,
		totalToday: 0,
	},
	error: null,
};
export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		getFeed: (state) => state.feed,
		getError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = 'connecting';
			})
			.addCase(onOpen, (state) => {
				state.status = 'open';
			})
			.addCase(onClose, (state) => {
				state.status = 'close';
			})
			.addCase(onError, (state, action) => {
				state.status = 'error';
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.feed = action.payload;
			});
	},
});

export const { getFeed, getError } = feedSlice.selectors;
