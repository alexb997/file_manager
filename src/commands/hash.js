import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";

const calculateHash = async (filePath) => {
  try {
    await access(filePath);

    const hash = createHash("sha256");
    const stream = createReadStream(filePath);

    stream.on("error", () => console.log("Operation failed"));

    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => {
      console.log(hash.digest("hex"));
    });
  } catch {
    console.log("Operation failed");
  }
};

export {calculateHash};
