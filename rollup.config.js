import css from 'rollup-plugin-css-only';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  external: [ 'jquery' ],
  plugins: [ 
    css({ output: 'bundle.css' }),
    babel({
      exclude: 'node_modules/**',
    }),
    filesize(),
    progress(),
   ],
};
