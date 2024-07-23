const typescriptEslintParser = require('@typescript-eslint/parser')
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
const prettierPlugin = require('eslint-plugin-prettier')
const importPlugin = require('eslint-plugin-import')

module.exports = [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'next.config.js',
            'fix-tsconfig.js',
        ],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser: typescriptEslintParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'prettier/prettier': ['error', { singleQuote: true, semi: false }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    'newlines-between': 'always',
                },
            ],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['*.js'], // Specify the files you want to apply this rule to
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser: require('@babel/eslint-parser'), // Use @babel/eslint-parser for JavaScript files
            parserOptions: {
                requireConfigFile: false, // If you don't have a Babel config file
            },
        },
        rules: {
            // Define any specific rules for JavaScript files here
        },
    },
]
