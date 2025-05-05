import fs from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const rootPath = path.parse(os.homedir()).root;

const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  return path.resolve(currentDir) === rootPath ? currentDir : parentDir;
};

const cd = async (dir, currentDir) => {
  const newPath = path.resolve(currentDir, dir);
  const stats = await fs.stat(newPath);
  if (stats.isDirectory()) return newPath;
  throw new Error("Not a directory");
};

const ls = async (currentDir) => {
  try {
    const files = await readdir(currentDir);
    const result = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(currentDir, file);
        const fileStat = await stat(filePath);
        return {
          Name: file,
          Type: fileStat.isDirectory() ? "directory" : "file"
        };
      })
    );

    console.table(result);
  } catch {
    console.log("Operation failed");
  }
};

export { up, cd, ls };
