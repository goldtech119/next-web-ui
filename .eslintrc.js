const { rules } = require('eslint-config-xo-typescript');

/** @type {import('prettier').Config} */
const prettierConfig = {
    singleQuote: true,
	jsxSingleQuote: false,
    trailingComma: 'all',
    endOfLine: 'auto',
    printWidth: 120,
    useTabs: true,
    arrowParens: 'avoid',
}

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
	root: true,
	parser: '@typescript-eslint/parser',
	ignorePatterns: [
		'.eslintrc.js',
		'*.config.js',
		'node_modules/',
		'dist/',
		'locales/',
		'public/'
	],
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'mui',
		'import',
		'prettier'
	],
	extends: [
		'next',
		'xo',
		'xo/browser',
		'xo-typescript',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	rules: {
		'prettier/prettier': ['error', prettierConfig],
		'@typescript-eslint/object-curly-spacing': [
			'error',
			'always'
		],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/naming-convention': ['error', 
			{
				selector: 'objectLiteralProperty',
				filter: '^&.*',
				format: null,
			},
			{
				selector: 'objectLiteralProperty',
				filter: '.*', // filter is a hack, required due to spreading default rules
				format: ['strictCamelCase', 'StrictPascalCase'],
				leadingUnderscore: 'allowSingleOrDouble',
			},
			{
				selector: 'variable',
				filter: '.*', // filter is a hack, required due to spreading default rules
				format: ['strictCamelCase', 'StrictPascalCase'],
				leadingUnderscore: 'allowSingleOrDouble',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'function',
				filter: '.*', // filter is a hack, required due to spreading default rules
				format: ['strictCamelCase', 'StrictPascalCase'],
			},
			...rules['@typescript-eslint/naming-convention'].slice(1),
		],
		'import/order': [
			'error',
			{
				'groups': ['builtin', 'external', 'parent', 'sibling', 'index'],
				'pathGroups': [
					{
						pattern: '@dynogg/**',
						group: 'builtin',
						position: 'after',
					},
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@mui/**',
						group: 'external',
						position: 'before',
					},
				],
				distinctGroup: false,
				'pathGroupsExcludedImportTypes': ['builtin'],
				'newlines-between': 'always',
				'alphabetize': {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],
		'jsx-quotes': ['error', 'prefer-double'],
		'no-restricted-imports': ['error', {
			'paths': [
				{
					'name': '@emotion/react',
					'message': 'Please use @mui/material instead.'
				}
			]
		}],
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
				flatTernaryExpressions: true,
				FunctionDeclaration: {
					parameters: 'first',
				},
				FunctionExpression: {
					parameters: 'first',
				},
				ignoredNodes: ['PropertyDefinition']
			},
		],
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'no-alert': 'warn',
		'indent': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/ban-types': 'off',
		'capitalized-comments': 'off'
	},
};

module.exports = config;
