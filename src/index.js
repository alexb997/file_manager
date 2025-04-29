const path = require("path");
const { listFiles } = require("./listFiles");

const dir = process.argv[2] || __dirname;

listFiles(dir)
  .then((files) => {
    console.log(`Files in "${dir}":`);
    files.forEach((file) => console.log(file));
  })
  .catch((err) => {
    console.error(err.message);
  });
