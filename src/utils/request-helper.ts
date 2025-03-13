export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async <T>(res: Response): Promise<T> => {
	const body = await res.json();
	if (res.ok) {
		return body as T;
	}
	return Promise.reject(body);
};

const checkSuccess = <T>(res: T): Promise<T> => {
	return (res as any).success
		? Promise.resolve(res)
		: Promise.reject(`Ответ не success: ${JSON.stringify(res)}`);
};

export const request = async <T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> => {
	const res = await fetch(`${BASE_URL}${endpoint}`, options);
	const res_2 = await checkResponse<T>(res);
	return checkSuccess(res_2);
};

interface TokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export const refreshToken = (): Promise<TokenResponse> => {
	return (
		fetch(`${BASE_URL}auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then((res) => checkResponse<TokenResponse>(res))
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const requestWithRefresh = async <T>(
	endpoint: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, options);
		const data: T = await checkResponse(res);

		return data;
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData: TokenResponse = await refreshToken(); //обновляем токен
			// options.headers.authorization = refreshData.accessToken; //doesn't work
			if (!(options.headers instanceof Headers)) {
				options.headers = new Headers(options.headers);
			}
			if (refreshData.accessToken)
				options.headers.set('authorization', refreshData.accessToken);

			const res = await fetch(endpoint, options); //повторяем запрос
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};
