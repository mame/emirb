import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy';

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "umd",
    name: "index.js"
  },
  plugins: [
    commonjs(),
    resolve(),
    copy({
      targets: [
        { src: "src/index.html", dest: "dist/" },
        { src: "node_modules/ruby-wasm-emscripten/dist/**/*", dest: "dist/ruby-wasm-emscripten-dist" },
      ]
    }),
  ]
};
