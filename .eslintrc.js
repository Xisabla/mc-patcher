module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },

    // React
    settings: {
        react: {
            version: 'detect'
        }
    },

    // Sort requires
    plugins: ['sort-requires'],

    // Main rules
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],

    // Sort require rules
    rules: {
        'sort-requires/sort-requires': 2
    }
}
