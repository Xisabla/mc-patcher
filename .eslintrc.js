module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },

    // Typescript parser
    parser: '@typescript-eslint/parser',

    // React
    settings: {
        react: {
            version: 'detect'
        }
    },

    // Sort requires
    plugins: ['@typescript-eslint', 'simple-import-sort', 'sort-requires'],

    // Main rules
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    // Sort require rules
    rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'sort-requires/sort-requires': 2,
        'simple-import-sort/sort': 'error'
    }
}
