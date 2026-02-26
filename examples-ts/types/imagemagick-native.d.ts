declare module "imagemagick-native" {
  export interface ConvertOptions {
    srcData: Buffer;
    srcFormat: string;
    format: string;
  }

  export function convert(
    options: ConvertOptions,
    callback: (err: unknown, buffer: Buffer) => void
  ): void;
}
