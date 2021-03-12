const apiPath = "./src/resources/i18n/";
const { exec } = require("child_process");

require("../loadEnv");

const sourceFile = "en.json";

const TRANSIFEX_TOKEN = process.env.TRANSIFEX_TOKEN;
const TRANSIFEX_SECRET = process.env.TRANSIFEX_SECRET;

const command = "txjs-cli push " + apiPath + sourceFile + " --token=" + TRANSIFEX_TOKEN + " --secret=" + TRANSIFEX_SECRET;

exec(command, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});