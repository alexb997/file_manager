import { up, cd, ls } from "../commands/navigation.js";

export const handleCommand = async (input, currentDir, setDir) => {
  const [command, ...args] = input.split(" ");

  try {
    switch (command) {
      case "up":
        setDir(up(currentDir));
        break;
      case "cd":
        setDir(await cd(args[0], currentDir));
        break;
      case "ls":
        await ls(currentDir);
        break;
      default:
        console.log("Unknown command");
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
};
