import { Ingredient } from '../../types'; // Adjust path as needed

export const mockEmptyIngredient: Ingredient = {
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

export const mockBun: Ingredient = {
	_id: 'bun_60d3b41abdacab0026a733c6',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

export const mockIngredientMain1: Ingredient = {
	_id: 'main_60d3b41abdacab0026a733c9',
	name: 'Биокотлета из марсианской Магнолии',
	type: 'main',
	proteins: 420,
	fat: 142,
	carbohydrates: 242,
	calories: 4242,
	price: 424,
	image: 'https://code.s3.yandex.net/react/code/meat-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	__v: 0,
	key: 'uuid_main_1',
};

export const mockIngredientSauce1: Ingredient = {
	_id: 'sauce_60d3b41abdacab0026a733cd',
	name: 'Соус фирменный Space Sauce',
	type: 'sauce',
	proteins: 50,
	fat: 22,
	carbohydrates: 11,
	calories: 14,
	price: 80,
	image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
	__v: 0,
	key: 'uuid_sauce_1',
};

export const mockIngredientMain2: Ingredient = {
	_id: 'main_60d3b41abdacab0026a733ca',
	name: 'Говяжий метеорит (отбивная)',
	type: 'main',
	proteins: 800,
	fat: 800,
	carbohydrates: 300,
	calories: 2674,
	price: 3000,
	image: 'https://code.s3.yandex.net/react/code/meat-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
	__v: 0,
	key: 'uuid_main_2',
};
