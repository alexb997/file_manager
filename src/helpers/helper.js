import { up, cd, ls } from "../commands/navigation.js";
import { cat, add, mkdir, rm } from "../commands/file.js";

export const handleCommand = async (input, currentDir, setDir) => {
  const [command, ...args] = input.split(" ");

  try {
    switch (command) {
      case "up":
        try {
          setDir(up(currentDir));
        } catch {
          console.log("Operation failed");
        }
        break;
      case "cd":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        try {
          const newDir = await cd(args[0], currentDir);
          setDir(newDir);
        } catch {
          console.log("Operation failed");
        }
        break;
      case "ls":
        try {
          await ls(currentDir);
        } catch {
          console.log("Operation failed");
        }
        break;
      case "cat":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        await cat(path.resolve(currentDir, args[0]));
        break;
      case "add":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        await add(args[0], currentDir);
        break;
      case "mkdir":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        await mkdir(args[0], currentDir);
        break;
      case "rm":
        if (!args[0]) {
          console.log("Invalid input");
          break;
        }
        await rm(path.resolve(currentDir, args[0]));
        break;
      default:
        console.log("Invalid input");
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
};
