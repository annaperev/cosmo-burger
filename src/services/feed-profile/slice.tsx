import { createSlice } from '@reduxjs/toolkit';
import {
	onCloseProfile,
	onConnectingProfile,
	onErrorProfile,
	onMessageProfile,
	onOpenProfile,
} from './actions';
import { FeedResponse } from '../../types';

export type FeedProfileState = {
	status: 'connecting' | 'open' | 'error' | 'close';
	feedProfile: FeedResponse;
	error: string | null;
};

export const initialState: FeedProfileState = {
	status: 'close',
	feedProfile: {
		success: true,
		orders: [],
		total: 0,
		totalToday: 0,
	},
	error: null,
};
export const feedProfileSlice = createSlice({
	name: 'feedProfile',
	initialState,
	reducers: {},
	selectors: {
		getStatus: (state) => state.status,
		getFeedProfile: (state) => state.feedProfile,
		getError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onConnectingProfile, (state: FeedProfileState) => {
				state.status = 'connecting';
			})
			.addCase(onOpenProfile, (state: FeedProfileState) => {
				state.status = 'open';
			})
			.addCase(onCloseProfile, (state: FeedProfileState) => {
				state.status = 'close';
			})
			.addCase(onErrorProfile, (state: FeedProfileState, action) => {
				state.status = 'error';
				state.error = action.payload;
			})
			.addCase(onMessageProfile, (state: FeedProfileState, action) => {
				state.feedProfile = action.payload;
			});
	},
});

export const { getFeedProfile } = feedProfileSlice.selectors;
