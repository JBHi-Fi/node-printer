import printer = require("..");
import * as fs from "fs";

let imagemagick: typeof import("imagemagick-native");
const filename = process.argv[2];
const printername = process.argv[3];

if (process.platform !== "win32") {
  throw new Error(
    "This application can be run only on win32 as a demo of print PDF image"
  );
}

if (!filename) {
  throw new Error(
    "PDF file name is missing. Please use the following params: <filename> [printername]"
  );
}

try {
  imagemagick = require("imagemagick-native");
} catch (error) {
  throw new Error("please install imagemagick-native: `npm install imagemagick-native`");
}

const data = fs.readFileSync(filename);

console.log("data: " + data.toString().substr(0, 20));

imagemagick.convert(
  {
    srcData: data,
    srcFormat: "PDF",
    format: "EMF",
  },
  (err, buffer) => {
    if (err) {
      throw new Error("something went wrong on converting to EMF: " + err);
    }

    printer.printDirect({
      data: buffer,
      type: "EMF",
      printer: printername,
      success(id) {
        console.log("printed with id " + id);
      },
      error(error) {
        console.error("error on printing: " + error);
      },
    });
  }
);
