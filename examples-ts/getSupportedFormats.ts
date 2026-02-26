import printer = require("..");
import * as util from "util";

console.log(
  "supported formats are:\n" +
    util.inspect(printer.getSupportedPrintFormats(), {
      colors: true,
      depth: 10,
    })
);
