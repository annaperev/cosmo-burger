import { feedSlice, initialState, FeedState } from './slice';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { FeedResponse } from '../../types';

describe('feedSlice', () => {
	it('should return the initial state', () => {
		const state = feedSlice.reducer(undefined, { type: 'TEST_ACTION' } as any);
		expect(state).toEqual(initialState);
	});

	it('should handle onConnecting action', () => {
		const state = feedSlice.reducer(initialState, onConnecting());
		expect(state).toEqual({
			...initialState,
			status: 'connecting',
		});
	});

	it('should handle onOpen action', () => {
		const state = feedSlice.reducer(initialState, onOpen());
		expect(state).toEqual({
			...initialState,
			status: 'open',
		});
	});

	it('should handle onClose action', () => {
		const startState: FeedState = {
			...initialState,
			status: 'open',
		};
		const state = feedSlice.reducer(startState, onClose());
		expect(state).toEqual({
			...initialState,
			status: 'close',
		});
	});

	it('should handle onError action', () => {
		const errorMessage = 'Connection error';
		const state = feedSlice.reducer(initialState, onError(errorMessage));
		expect(state).toEqual({
			...initialState,
			status: 'error',
			error: errorMessage,
		});
	});

	it('should handle onMessage action', () => {
		const mockFeedData: FeedResponse = {
			success: true,
			orders: [
				{
					_id: '123',
					ingredients: ['ingredient1', 'ingredient2'],
					status: 'done',
					name: 'Test Burger',
					createdAt: '2025-04-13T12:00:00.000Z',
					updatedAt: '2025-04-13T12:00:00.000Z',
					number: 12345,
				},
			],
			total: 100,
			totalToday: 10,
		};

		const state = feedSlice.reducer(initialState, onMessage(mockFeedData));
		expect(state).toEqual({
			...initialState,
			feed: mockFeedData,
		});
	});

	describe('selectors', () => {
		it('getFeed should return feed data', () => {
			const mockFeedData: FeedResponse = {
				success: true,
				orders: [
					{
						_id: '123',
						ingredients: ['ingredient1', 'ingredient2'],
						status: 'done',
						name: 'Test Burger',
						createdAt: '2025-04-13T12:00:00.000Z',
						updatedAt: '2025-04-13T12:00:00.000Z',
						number: 12345,
					},
				],
				total: 100,
				totalToday: 10,
			};

			const rootState = { feed: { ...initialState, feed: mockFeedData } };
			const getFeed = feedSlice.getSelectors(
				(state: any) => state.feed
			).getFeed;

			expect(getFeed(rootState)).toEqual(mockFeedData);
		});

		it('getError should return error message', () => {
			const errorMessage = 'Test error';

			const rootState = { feed: { ...initialState, error: errorMessage } };
			const getError = feedSlice.getSelectors(
				(state: any) => state.feed
			).getError;

			expect(getError(rootState)).toEqual(errorMessage);
		});
	});
});
