import { loadRuby } from "ruby-wasm-emscripten";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { openpty } from "xterm-pty";

var div = document.getElementById("terminal");

var xterm = new Terminal();
xterm.open(div);

const { master, slave } = openpty();
xterm.loadAddon(master);

const main = async () => {
  const args = ["--disable-gems", "-e", "require 'irb'; IRB.setup(nil, argv: ['--no-pager']); IRB::Irb.new.run"];
  console.log(`$ ruby.wasm ${args.join(" ")}`);
  const defaultModule = {
    locateFile: (path) => "./ruby-wasm-emscripten-dist/" + path,
    setStatus: (msg) => {
      document.getElementById("status").innerText = msg == "" ? "Ready" : msg;
    },
    print: (line) => {
      if (document) {
        document.body.innerText += line;
      }
      console.log(line);
    },
    arguments: args,
    pty: slave,
  };
  await loadRuby(defaultModule);
};

main();
