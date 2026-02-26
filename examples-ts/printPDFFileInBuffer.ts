import printer = require("..");
import * as fs from "fs";
import * as path from "path";

let filename = process.argv[2];

if (process.platform === "win32") {
  throw new Error("Not yet supported for win32");
}

if (!filename || filename === "-h") {
  throw new Error(
    "PDF file name is missing. Please use the following params: <filename> [printername]"
  );
}

filename = path.resolve(process.cwd(), filename);
console.log("printing file name " + filename);

fs.readFile(filename, (err, data) => {
  if (err) {
    console.error("err:" + err);
    return;
  }
  console.log(
    "data type is: " + typeof data + ", is buffer: " + Buffer.isBuffer(data)
  );
  printer.printDirect({
    data,
    type: "PDF",
    success(id) {
      console.log("printed with id " + id);
    },
    error(error) {
      console.error("error on printing: " + error);
    },
  });
});
