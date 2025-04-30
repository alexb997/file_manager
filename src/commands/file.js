import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const cat = async (filePath) => {
  const readStream = fs.createReadStream(filePath, "utf-8");
  readStream.on("data", (chunk) => process.stdout.write(chunk));
  await new Promise((resolve, reject) => {
    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
};

const add = async (fileName, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  await fs.promises.writeFile(filePath, "");
};

const mkdir = async (dirName, currentDir) => {
  const dirPath = path.join(currentDir, dirName);
  await fs.promises.mkdir(dirPath, { recursive: false });
};

const rm = async (filePath) => {
  await fs.promises.unlink(filePath);
};

const rn = async (oldPath, newFileName) => {
  const dir = path.dirname(oldPath);
  const newPath = path.join(dir, newFileName);
  await fs.promises.rename(oldPath, newPath);
};

const cp = async (sourcePath, destDir) => {
  const fileName = path.basename(sourcePath);
  const destPath = path.join(destDir, fileName);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  await pipeline(readStream, writeStream);
};

const mv = async (sourcePath, destDir) => {
  await cp(sourcePath, destDir);
  await fs.promises.unlink(sourcePath);
};

export { cat, add, mkdir, rm, rn, cp, mv };
