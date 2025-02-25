import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

const loaderSizes = {
	small: 16,
	medium: 24,
	large: 80,
};
export const Loader = ({
	size,
	inverse = false,
}: {
	size: keyof typeof loaderSizes;
	inverse: boolean;
}) => {
	const loaderColor = inverse ? '#fff' : '#3C39EC';

	type LoaderSize = keyof typeof loaderSizes; // 'small' | 'medium' | 'large'
	type WrapperStyleKey = `wrapper_${LoaderSize}`; // 'wrapper_small' | 'wrapper_medium' | 'wrapper_large'

	const wrapperStyleKey: WrapperStyleKey = `wrapper_${size}`;
	console.log('wrapperStyleKey', wrapperStyleKey);
	return (
		<div className={style[wrapperStyleKey]}>
			<LoaderSvg color={loaderColor} size={loaderSizes[size]} />
		</div>
	);
};
