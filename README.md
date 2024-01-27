# irb demo

https://mame.github.io/emirb/

## How to build

Use emscripten 3.1.52 or later.

```
$ ./build.sh
```

## Powered by

* [ruby-wasm-emscripten](https://www.npmjs.com/package/@ruby/head-wasm-emscripten)
* [xterm-pty](https://xterm-pty.netlify.app/)

## TODO

* abandon `GC.disable`
* `SIGWINCH` signal support
