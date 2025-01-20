import { useState, useEffect } from 'react';
import { IngredientApiResponse } from '../../../types';

export const useFetch = (url: string) => {
	const [state, setState] = useState<{
		responseData: IngredientApiResponse;
		isLoading: boolean;
		hasError: boolean;
	}>({
		responseData: {
			success: false,
			data: [],
		},
		isLoading: true,
		hasError: false,
	});

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) =>
				setState({
					responseData: data,
					isLoading: false,
					hasError: false,
				})
			)
			.catch(() =>
				setState({
					responseData: {
						success: false,
						data: [],
					},
					isLoading: false,
					hasError: true,
				})
			);
	}, [url]);

	return state;
};
