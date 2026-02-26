import printer = require("..");

printer.printDirect({
  data: "print from Node.JS buffer",
  type: "RAW",
  success(jobID) {
    console.log("sent to printer with ID: " + jobID);
  },
  error(err) {
    console.log(err);
  },
});
