export type Ingredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	key?: string;
};

export const emptyIngredient: Ingredient = {
	_id: '',
	name: '',
	type: '',
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	price: 0,
	image: '',
	image_mobile: '',
	image_large: '',
	__v: 0,
};

export type IngredientApiResponse = {
	success: boolean;
	data: Ingredient[];
};

export type TOrder = {
	_id: string;
	ingredients: string[];
	name: string;
	createdAt: string;
	status: string;
	number: number;
	updatedAt: string;
};

export type FeedResponse = {
	success: true;
	orders: TOrder[];
	total: number;
	totalToday: number;
};
