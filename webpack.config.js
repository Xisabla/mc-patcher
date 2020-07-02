const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',

    context: path.resolve(__dirname),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            // ESLint
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                            emitWarning: true
                        }
                    }
                ],
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')]
            },
            // Typescript: ts-loader
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/
            },
            // Js/React: babel-loader
            {
                test: /\.(js|jsx)$/i,
                use: [
                    {
                        loader: 'source-map-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            // CSS: Extract
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // Sass, CSS: css-loader, sass-loader
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // Fonts: file-loader
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            // Images: url-loader
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.css'
        })
    ],

    performance: {
        hints: false
    }
}
