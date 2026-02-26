// Type definitions for node-printer 0.4
// Definitions by:
//                 goooseman <https://github.com/goooseman>
// TypeScript Version: 3.7

// https://github.com/tojocky/node-printer

/**
 * Data example from DNP DS RX1
 * { name: 'Dai_Nippon_Printing_DS_RX1',
 * description: 'DNP DS-RX1',
 * status: 3,
 * isDefault: true,
 * options:
 *  { copies: '1',
 *    'device-uri': 'usb://Dai%20Nippon%20Printing/DS-RX1?location=14200000',
 *    finishings: '3',
 *   'job-cancel-after': '10800',
 *   'job-hold-until': 'no-hold',
 *    'job-priority': '50',
 *    'job-sheets': 'none,none',
 *   'marker-change-time': '1569477410',
 *   'marker-colors': '#00FFFF',
 *    'marker-levels': '97',
 *   'marker-message': '683/700',
 *   'marker-names': 'RX1 6x4',
 *   'marker-types': 'inkRibbon',
 *   'number-up': '1',
 *    'printer-commands': 'AutoConfigure,ReportLevels,ReportStatus',
 *   'printer-info': 'DNP DS-RX1',
 *   'printer-is-accepting-jobs': 'true',
 *   'printer-is-shared': 'false',
 *   'printer-is-temporary': 'false',
 *   'printer-location': 'Alexander’s MacBook Pro',
 *   'printer-make-and-model': 'Dai Nippon Printing  DS-RX1, 5.0.14 (build 421) (CUPS)',
 *   'printer-state': '3',
 *   'printer-state-change-time': '1569477417',
 *   'printer-state-reasons': 'none',
 *   'printer-type': '10489868',
 *   'printer-uri-supported': 'ipp://localhost/printers/Dai_Nippon_Printing_DS_RX1',
 *   system_driverinfo: 'D' } }
 */
interface PrinterDevice {
  name?: string;
  isDefault?: boolean;
  status?: string | number;
  options?: Record<string, unknown>;
  [key: string]: unknown;
}

interface PrintOptions {
  printer?: string;
  docname?: string;
  /**
   * type: RAW, TEXT, PDF, JPEG, .. depends on platform
   */
  type?: string;
  /**
   * supported page sizes may be retrieved using getPrinterDriverOptions, supports CUPS printing options
   */
  options?: Object;
  success?(jobId: number | string): void;
  error?(err?: Error | string): void;
}

interface PrintDirectOptions extends PrintOptions {
  data: Buffer | string;
}

interface PrintFileOptions extends PrintOptions {
  filename: string;
}

declare const printer: {
  getPrinters(): PrinterDevice[] | undefined;
  getPrinter(printerName?: string): PrinterDevice | undefined;
  /**
   * { PageSize:
   *   { '200dnp5x3.5': false,
   *     dnp5x5: false,
   *     '210dnp5x7': false,
   *     '300dnp6x4': false,
   *     dnp6x6: false,
   *     '310dnp6x8': true },
   *  PageRegion:
   *   { '200dnp5x3.5': false,
   *     dnp5x5: false,
   *     '210dnp5x7': false,
   *     '300dnp6x4': false,
   *     dnp6x6: false,
   *     '310dnp6x8': false },
   *  Cutter: { Normal: true, NoWaste: false, '2Inch': false },
   *  Finish: { Glossy: true, Matte: false },
   *  Resolution: { '300x300dpi': true, '300x600dpi': false },
   *  ColorModel: { RGB: true },
   *  PrintRetry: { False: false, True: true },
   *  BonusPrint: { False: true, True: false },
   *  Sharpness:
   *   { '0': true,
   *     ...
   *     },
   *  AdjustmentsEnabled: { True: false, False: true },
   *  Red:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false },
   *  Green:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false },
   *  Blue:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false },
   *  Brightness:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false },
   *  Contrast:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false },
   *  Saturation:
   *   { '0': true,
   *     ...
   *     '-1': false },
   *  Gamma:
   *   { '0': true,
   *     '1': false,
   *     ...
   *     '-1': false } }
   */
  getPrinterDriverOptions(printerName?: string):
    | Record<string, Record<string, boolean>>
    | undefined;
  /**
   * e.g. 310dnp6x8
   */
  getSelectedPaperSize(printerName?: string): string;
  getDefaultPrinterName(): string | undefined;
  printDirect(options: PrintDirectOptions): void;
  printDirect(
    data: Buffer | string,
    printer?: string,
    type?: string,
    docname?: string,
    options?: Object,
    success?: (jobId: number | string) => void,
    error?: (err?: Error | string) => void
  ): void;
  printFile(options: PrintFileOptions): void;
  getSupportedPrintFormats(): string[];
  getJob(printerName: string, jobId: string | number): unknown;
  setJob(printerName: string, jobId: string | number, command: string): unknown;
  getSupportedJobCommands(): string[];
};

export = printer;
