#!/bin/bash

set -ex

DIR=`git rev-parse --show-toplevel`

npm install

cd ruby.wasm

./bin/setup
bundle exec rake compile
RUBY_WASM_ADDITIONAL_EXTS=io/console,io/wait RUBY_WASM_EMCC_LDFLAGS="-sASYNCIFY --js-library $DIR/node_modules/xterm-pty/emscripten-pty.js" bundle exec rake npm:ruby-head-wasm-emscripten:build

cd $DIR

npm run build
