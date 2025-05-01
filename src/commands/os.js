import os from "node:os";

const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`
    );
  });
};

const getHomeDir = () => {
  console.log(os.homedir());
};

const getUserName = () => {
  console.log(os.userInfo().username);
};

const getArchitecture = () => {
  console.log(os.arch());
};

export { getEOL, getCPUs, getHomeDir, getUserName, getArchitecture };