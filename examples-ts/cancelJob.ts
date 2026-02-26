import printer = require("..");
import * as util from "util";

const printerName = "Foxit Reader PDF Printer";
const printerFormat = "TEXT";

printer.printDirect({
  data: "print from Node.JS buffer",
  printer: printerName,
  type: printerFormat,
  options: {
    media: "Letter",
    "fit-to-page": true,
  },
  success(jobID) {
    console.log("sent to printer with ID: " + jobID);
    const jobInfo = printer.getJob(printerName, jobID);
    console.log(
      "current job info:" + util.inspect(jobInfo, { depth: 10, colors: true })
    );

    const jobStatus = (jobInfo as { status?: string } | undefined)?.status;
    if (typeof jobStatus === "string" && jobStatus.indexOf("PRINTED") !== -1) {
      console.log("too late, already printed");
      return;
    }

    console.log("cancelling...");
    const isOk = printer.setJob(printerName, jobID, "CANCEL");
    console.log("cancelled: " + isOk);
    try {
      console.log(
        "current job info:" +
          util.inspect(printer.getJob(printerName, jobID), {
            depth: 10,
            colors: true,
          })
      );
    } catch (err) {
      console.log("job deleted. err:" + err);
    }
  },
  error(err) {
    console.log(err);
  },
});
