import printer = require("..");

printer.getPrinters();
printer.getPrinter();
printer.getPrinterDriverOptions();
printer.getSelectedPaperSize();
printer.getDefaultPrinterName();

printer.printDirect({
  data: "test",
  success(jobId) {
    console.log(jobId);
  },
  error(err) {
    console.error(err);
  },
});

printer.printDirect(
  "raw data",
  "Printer Name",
  "RAW",
  "Doc",
  {},
  (jobId) => {
    console.log(jobId);
  },
  (err) => {
    console.error(err);
  }
);

printer.printFile({
  filename: "./file.txt",
  success(jobId) {
    console.log(jobId);
  },
});

printer.getJob("Printer Name", 1);
printer.setJob("Printer Name", 1, "CANCEL");
