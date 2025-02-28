export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async (res: Response) => {
	const body = await res.json();
	if (res.ok) {
		return body;
	}
	return Promise.reject(body);
};

const checkSuccess = (res: any) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

// универсальная функция запроса с проверкой ответа и `success`
export const request = (endpoint: string, options?: RequestInit) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const refreshToken = () => {
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
			.then(checkResponse)
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

export const requestWithRefresh = async (
	endpoint: string,
	options: RequestInit
) => {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, options);
		const data = await checkResponse(res);

		return data;
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			// options.headers.authorization = refreshData.accessToken; //doesn't work
			if (!(options.headers instanceof Headers)) {
				options.headers = new Headers(options.headers);
			}
			options.headers.set('authorization', refreshData.accessToken);

			const res = await fetch(endpoint, options); //повторяем запрос
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
