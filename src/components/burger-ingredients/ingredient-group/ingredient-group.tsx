import React, { FC } from 'react';
import ingredients from '../../../app/utils/data';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';

import styles from './ingredient-group.module.css';

export const typeTranslations: Record<string, string> = {
	bun: 'Булки',
	main: 'Начинки',
	sauce: 'Соусы',
};
export const IngredientGroup: FC<{ type: string }> = ({ type }) => {
	const translatedType = typeTranslations[type] || type;

	return (
		<div className='mt-10'>
			<h1 className={'text text_type_main-medium'}>{translatedType}</h1>
			<div className={`${styles.group} pl-4 pt-6`}>
				{ingredients
					.filter((i) => i.type === type)
					.map((ingredient) => (
						<IngredientItem key={ingredient._id} ingredient={ingredient} />
					))}
			</div>
		</div>
	);
};

IngredientGroup.propTypes = {
	type: PropTypes.string.isRequired,
};
