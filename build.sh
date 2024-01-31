#!/bin/bash

set -ex

DIR=`git rev-parse --show-toplevel`

XTERM_PTY_VERSION=`node -e 'console.log(JSON.parse(fs.readFileSync("package-lock.json"))["packages"]["node_modules/xterm-pty"]["version"])'`

curl -L -O https://unpkg.com/xterm-pty@$XTERM_PTY_VERSION/emscripten-pty.js

cd ruby.wasm

./bin/setup
bundle exec rake compile
RUBY_WASM_ADDITIONAL_EXTS=io/console,io/wait RUBY_WASM_EMCC_LDFLAGS="-sASYNCIFY -sASYNCIFY_STACK_SIZE=524288 -sSTACK_SIZE=262144 -sALLOW_MEMORY_GROWTH=1 --js-library $DIR/emscripten-pty.js" INSTRUBY_OPTS=--exclude=bundled-gems bundle exec rake npm:ruby-head-wasm-emscripten:build

cd $DIR

npm install
npm run build
