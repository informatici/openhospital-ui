import { defineConfig } from "cypress";
import plugin from "./cypress/plugins";

export default defineConfig({
  env: {
    HOSTNAME: "http://localhost:3000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      plugin(on, config);
    },
    testIsolation: false,
    experimentalRunAllSpecs: true,
  },
});
