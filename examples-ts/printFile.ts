import printer = require("..");
import * as fs from "fs";

const filename = process.argv[2] || __filename;
const printerName = process.argv[3];

console.log("platform:", process.platform);
console.log("try to print file: " + filename);

if (process.platform !== "win32") {
  printer.printFile({
    filename,
    printer: printerName,
    success(jobID) {
      console.log("sent to printer with ID: " + jobID);
    },
    error(err) {
      console.log(err);
    },
  });
} else {
  printer.printDirect({
    data: fs.readFileSync(filename),
    printer: printerName,
    success(jobID) {
      console.log("sent to printer with ID: " + jobID);
    },
    error(err) {
      console.log(err);
    },
  });
}
