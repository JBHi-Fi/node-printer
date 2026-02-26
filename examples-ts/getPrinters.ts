import printer = require("..");
import * as util from "util";

console.log(
  "installed printers:\n" +
    util.inspect(printer.getPrinters(), { colors: true, depth: 10 })
);
