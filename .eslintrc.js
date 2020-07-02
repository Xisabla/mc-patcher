module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },

    plugins: ['sort-requires'],

    extends: ['eslint:recommended', 'plugin:prettier/recommended'],

    rules: {
        'sort-requires/sort-requires': 2
    }
}
