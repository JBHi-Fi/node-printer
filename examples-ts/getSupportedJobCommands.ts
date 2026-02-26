import printer = require("..");
import * as util from "util";

console.log(
  "supported job commands:\n" +
    util.inspect(printer.getSupportedJobCommands(), { colors: true, depth: 10 })
);
