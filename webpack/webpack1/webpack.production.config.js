
const path = require('path'); // For resolving file paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); // To inject scripts into the HTML file
const TerserPlugin = require('terser-webpack-plugin'); // For minifying JS code
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // To extract CSS into separate files
const { DefinePlugin } = require('webpack'); // To define global constants

module.exports = {
    mode: 'production', // Set Webpack mode to 'production' for optimized builds

    entry: './src/components/index.js', // Entry point for the application (main JS file)

    output: {
        // Specifies where the bundled files should be output
        path: path.resolve(__dirname, 'dist'), // Resolve the 'dist' directory
        filename: '[name].bundle.js', // Use the name of the entry point for the bundle filename
    },

    resolve: {
        extensions: ['.js', '.jsx'], // Automatically resolve these extensions during imports (no need to write them)
        alias: {
            '@': path.resolve(__dirname, 'src'), // Create an alias '@' to refer to the 'src' folder
        }
    },

    module: {
        rules: [
            {
                test: /\.(?:js|jsx)$/, // Rule for .js and .jsx files
                exclude: /node_modules/, // Exclude the 'node_modules' folder
                use: {
                    loader: 'babel-loader', // Use Babel loader to transpile JS/JSX
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Use these Babel presets for React and modern JavaScript
                    }
                }
            },
            {
                test: /\.css$/i, // Rule for handling .css files
                use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS into separate files
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Rule for image files
                type: 'asset/resource', // Convert image files into assets (e.g., copy to dist folder)
            },
        ]
    },

    plugins: [
        // Plugin to handle HTML files
        new HtmlWebpackPlugin({
            template: './public/index.html', // Use this template HTML file
            path: 'index.html' // Output the HTML file with injected script tags
        }),

        // Plugin to extract CSS into a separate file
        new MiniCssExtractPlugin(),

        // Define global variables at compile time
        new DefinePlugin({
            API_URL: JSON.stringify('https://api.example.com'), // Define a constant API_URL
        })
    ],

    optimization: {
        minimize: true, // Enable JS minification
        minimizer: [new TerserPlugin()], // Use TerserPlugin for minification of JS
        splitChunks: {
            // Split large chunks into smaller files to improve load performance
            chunks: 'async', // Only split chunks used asynchronously
            minSize: 200, // Minimum size of a chunk to be split
            minRemainingSize: 0,
            minChunks: 1, // Minimum number of chunks before splitting
            maxAsyncRequests: 30, // Max number of async requests for chunks
            maxInitialRequests: 30, // Max number of initial requests for chunks
            enforceSizeThreshold: 50000, // Enforce chunk size if it exceeds this size
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/, // Match all dependencies in node_modules
                    name: 'vendors', // Name of the cache group
                    chunks: 'all', // Split chunks from all types (async or initial)
                    priority: -10, // Lower priority for vendors chunk
                    reuseExistingChunk: true, // Reuse existing chunks if possible
                },
                default: {
                    minChunks: 1, // Split any common chunks
                    priority: -20, // Lower priority for default chunk
                    reuseExistingChunk: true, // Reuse existing chunks if possible
                    name: 'common', // Name of the default chunk
                    chunks: 'all', // Split common chunks from all types
                },
            },
        },
    },
};
