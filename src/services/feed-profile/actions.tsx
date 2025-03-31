import { createAction } from '@reduxjs/toolkit';
import { FeedResponse } from '../../types';

export const connectProfile = createAction<string, 'feedProfile/onConnect'>(
	'feedProfile/onConnect'
);
export const disconnectProfile = createAction('feedProfile/onDisconnect');

export const onConnectingProfile = createAction('feedProfile/onConnecting');
export const onOpenProfile = createAction('feedProfile/onOpen');
export const onErrorProfile = createAction<string, 'feedProfile/onError'>(
	'feedProfile/onError'
);
export const onCloseProfile = createAction('feedProfile/onClose');
export const onMessageProfile = createAction<
	FeedResponse,
	'feedProfile/onMessage'
>('feedProfile/onMessage');

export type TFeedProfileActions =
	| ReturnType<typeof connectProfile>
	| ReturnType<typeof disconnectProfile>
	| ReturnType<typeof onConnectingProfile>
	| ReturnType<typeof onErrorProfile>
	| ReturnType<typeof onMessageProfile>
	| ReturnType<typeof onOpenProfile>
	| ReturnType<typeof onCloseProfile>;
