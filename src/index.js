import { loadRuby } from "ruby-wasm-emscripten";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { openpty, Flags } from "xterm-pty";

var div = document.getElementById("terminal");

var xterm = new Terminal();
xterm.open(div);

const { master, slave } = openpty();
xterm.loadAddon(master);

const fitAddon = new FitAddon();
xterm.loadAddon(fitAddon);
new ResizeObserver(() => fitAddon.fit()).observe(div);
fitAddon.fit();

xterm.loadAddon(new WebLinksAddon());

const termios = slave.ioctl("TCGETS");
slave.ioctl("TCSETS", { ...termios, lflag: termios.lflag & ~0x0008 });

slave.write("  \x1b[1;36m      "  + "            "  + " \x1b[1;31m _\x1b[m\n");
slave.write("  \x1b[1;36m      "  + "            "  + " \x1b[1;31m(_)        .-.\x1b[m\n");
slave.write("  \x1b[1;36m  ___ "  + "  _ __ ___  "  + " \x1b[1;31m _   _ __  | |__\x1b[m\n");
slave.write("  \x1b[1;36m / _ \\" + " | '_ ` _ \\ " + " \x1b[1;31m| | | '_ | | '_ \\\x1b[m\n");
slave.write("  \x1b[1;36m|  __/"  + " | | | | | |"  + " \x1b[1;31m| | | | '' | |_) |\x1b[m\n");
slave.write("  \x1b[1;36m \\___|" + " |_| |_| |_|"  + " \x1b[1;31m|_| |_|    |_.__/\x1b[m\n");
slave.write("\n");
slave.write("* source code: https://github.com/mame/emirb\n");
slave.write("* powered by\n");
slave.write("  * ruby-wasm-emscripten: https://github.com/ruby/ruby.wasm\n");
slave.write("  * xterm-pty: https://xterm-pty.netlify.app/\n");
slave.write("\n");


const main = async () => {
  const args = ["--disable-gems", "-e", "require 'irb'; IRB.setup(nil, argv: ['--no-pager']); IRB::Irb.new.run"];
  console.log(`$ ruby.wasm ${args.join(" ")}`);
  const defaultModule = {
    locateFile: (path) => "./ruby-wasm-emscripten-dist/" + path,
    setStatus: (msg) => {
      if (msg == "") {
        slave.ioctl("TCSETS", { ...termios });
      }
      else {
        slave.write("\r\x1b[0K" + msg);
      }
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
