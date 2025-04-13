module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The test environment - 'node' is sufficient for non-DOM testing like reducers
	testEnvironment: 'node',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

	// A map from regular expressions to paths to transformers
	transform: {
		// Use babel-jest to transpile .ts and .tsx files
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},

	// Module file extensions for importing modules without specifying extensions
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
