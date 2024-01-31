import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy';

export default {
  input: "src/index.js",
  output: {
    dir: "docs",
    format: "umd",
    name: "index.js"
  },
  plugins: [
    commonjs(),
    resolve(),
    copy({
      targets: [
        { src: "src/index.html", dest: "docs/" },
        { src: "node_modules/xterm/css/xterm.css", dest: "docs/" },
        { src: "node_modules/ruby-wasm-emscripten/dist/**/*", dest: "docs/ruby-wasm-emscripten-dist" },
      ]
    }),
  ]
};
