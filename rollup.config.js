import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svg from '@rollup/plugin-svg';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

// Check if we are in development mode
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',  // Entry point of your application
  output: {
    format: 'iife',  // Immediately-invoked function expression
    name: 'app',
    file: 'public/build/bundle.js',  // Output file
    sourcemap: true  // Enable source maps for debugging
  },
  plugins: [
    svelte({
      // Enable run-time checks when not in production
      dev: !production,
      // Extract any component CSS into a separate file for better performance
      css: css => {
        css.write('public/build/bundle.css');
      }
    }),
    // Resolve bare module specifiers to relative paths
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),  // Convert CommonJS modules to ES6
    svg(),       // Handle SVG files
    // In production mode, minify the bundle
    production && terser(),
    // In development mode, serve the app and enable live reload
    !production && serve({
      contentBase: 'public',
      port: 5000,
      historyApiFallback: true  // Single Page Application fallback
    }),
    !production && livereload('public')  // Live reload the app on changes
  ]
};
