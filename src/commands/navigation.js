import fs from "node:fs/promises";
import path from "node:path";

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
  const files = await fs.readdir(currentDir, { withFileTypes: true });
  files.forEach((file) => {
    console.log(`${file.isDirectory() ? "[DIR]" : "[FILE]"} ${file.name}`);
  });
};

export { up, cd, ls };
