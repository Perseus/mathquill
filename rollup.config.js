import css from 'rollup-plugin-css-only';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import {  nodeResolve } from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [ 
    css({ output: 'bundle.css' }),
    babel({
      exclude: 'node_modules/**',
    }),
    filesize(),
    progress(),
    nodeResolve(),
    // uglify(),
   ],
};
