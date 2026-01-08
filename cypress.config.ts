import { defineConfig } from 'cypress';
import plugin from './cypress/plugins';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:5173',
		setupNodeEvents(on, config) {
			plugin(on, config);
		},
		specPattern: 'cypress/integrations/**/*.cy.ts',
		testIsolation: false,
		experimentalRunAllSpecs: true,
		defaultCommandTimeout: 10000,
		chromeWebSecurity: false,
	},
});
