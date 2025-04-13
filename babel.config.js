module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }], // Target the current Node.js version Jest runs on
		'@babel/preset-typescript',
		['@babel/preset-react', { runtime: 'automatic' }], // Use automatic runtime for React (good practice)
	],
};
