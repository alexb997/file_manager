import readline from "node:readline";
import { homedir } from "node:os";
import { handleCommand } from "./helpers/helper.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let currentDir = homedir();
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in: ${currentDir}`);
rl.prompt();

rl.on("line", async (input) => {
  await handleCommand(
    input.trim(),
    currentDir,
    (newDir) => (currentDir = newDir)
  );
  console.log(`You are currently in: ${currentDir}`);
  rl.prompt();
});
