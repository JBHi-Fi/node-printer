import printer = require("..");

const template =
  'N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,"barcode"\nP0\n';

function printZebra(barcodeText: string, printerName: string) {
  printer.printDirect({
    data: template.replace(/barcode/, barcodeText),
    printer: printerName,
    type: "RAW",
    success() {
      console.log("printed: " + barcodeText);
    },
    error(err) {
      console.log(err);
    },
  });
}

printZebra("123", "ZEBRA");
