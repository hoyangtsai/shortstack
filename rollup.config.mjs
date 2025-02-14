import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import { default as importHTTP } from 'import-http/rollup.js'
import babel from '@rollup/plugin-babel'

const dev = {
  input: 'app/js/index.js',
  output: {
    file: 'app/bundle.js',
    format: 'esm',
    sourcemap: 'inline',
  },
  plugins: [
    resolve(),
    importHTTP(),
    postcss({
      inject: false,
    }),
    babel({
      exclude: 'node_modules/**',
      "presets": [
        ["@babel/env"]
      ]
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  }
}

const prod = {
  input: 'app/js/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    importHTTP(),
    postcss({
      extract: true,
      minimize: { preset: 'default' },
    }),
    babel({
      exclude: 'node_modules/**',
      "presets": [
        ["@babel/env"]
      ]
    }),
    terser(),
  ]
}

export default process.env.NODE_ENV === 'production'
  ? prod
  : dev

