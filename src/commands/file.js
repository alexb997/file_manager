import fs from "node:fs";
import path from "node:path";

export const cat = async (filePath) => {
  const readStream = fs.createReadStream(filePath, "utf-8");
  readStream.on("data", (chunk) => process.stdout.write(chunk));
  await new Promise((resolve, reject) => {
    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
};

export const add = async (fileName, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  await fs.promises.writeFile(filePath, "");
};

export const mkdir = async (dirName, currentDir) => {
  const dirPath = path.join(currentDir, dirName);
  await fs.promises.mkdir(dirPath, { recursive: false });
};

export const rm = async (filePath) => {
  await fs.promises.unlink(filePath);
};
