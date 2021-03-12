const dotenv = require("dotenv");
const variableExpansion = require("dotenv-expand");
const fs = require("fs");
const Path = require("path");
/**
 * Searches for files in current working directory, returns the first file found.
 * String returned is the full file path
 *
 * @param files string[]
 * @returns string | undefined full path to file
 */
const findFileInCwd = (files) => {
  if (typeof files === "string") {
    files = [files];
  }
  const file = files.find(file => {
    try {
      const path = Path.join(process.cwd(), file);
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  });

  if (file) {
    return Path.join(process.cwd(), file);
  }
  return;
};

const loadEnv = () => {
  const NODE_ENV = process.env.NODE_ENV || "development";
  const dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    NODE_ENV !== "test" && ".env.local",
    ".env",
  ].filter(Boolean);

  dotenvFiles.forEach(dotenvFile => {
    if (!dotenvFile) {
      return;
    }
    const envPath = findFileInCwd([dotenvFile]);
    if (envPath) {
      const envs = dotenv.config({ path: envPath });
      variableExpansion(envs);
    }
  });
};

loadEnv();
