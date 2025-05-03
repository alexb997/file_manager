import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { access } from "node:fs/promises";

const compress = async (inputPath, outputPath) => {
  try {
    await access(inputPath);

    return await new Promise((resolve, reject) => {
      const source = createReadStream(inputPath);
      const destination = createWriteStream(outputPath);
      const brotli = createBrotliCompress();

      source.on("error", () => {
        console.log("Operation failed");
        reject();
      });
      destination.on("error", () => {
        console.log("Operation failed");
        reject();
      });

      destination.on("finish", resolve);

      source.pipe(brotli).pipe(destination);
    });
  } catch {
    console.log("Operation failed");
  }
};

export { compress };
