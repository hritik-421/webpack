

import path from 'path'; // Node.js built-in module to resolve file paths
import { fileURLToPath } from 'url'; // Used to simulate __dirname in ES modules
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Injects script tags into index.html

// __dirname is not available in ES modules, so this workaround is used
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: './src/main.jsx', // Entry point of the React app

  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].bundle.js', // Final bundled JS file name
    clean: true, // Cleans 'dist' folder before each build
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // Rule applies to .js and .jsx files
        exclude: /node_modules/, // Ignore node_modules
        use: {
          loader: 'babel-loader', // Transpiles modern JS and JSX
          options: {
            presets: [
              '@babel/preset-env', // Converts ES6+ to ES5
              '@babel/preset-react', // Converts JSX to JS
            ],
          },
        },
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'], // Loads and injects CSS
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i, // For image/media files
        type: 'asset/resource', // Bundles and copies media to output
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve these extensions
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Uses this HTML file and injects script
    }),
  ],
  cache:{
    type: 'filesystem', // Use filesystem caching for faster builds
    cacheDirectory: path.resolve('dist', '.temp_cache'), // Cache directory
    buildDependencies: {
      config: [__filename], // Rebuild if this config file changes
    },
  },

//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'public'), // Serve static files from here (like logos or manifest)
//     },
//     port: 3000, // Run the dev server on this port
//     open: true, // Automatically open the browser
//     hot: true, // Enables Hot Module Replacement (live changes without reload)
//   },

  mode: 'development', // Use development mode (no minification, with helpful warnings)
};

export default config;
