import path from 'node:path';
import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import plugin from './cypress/plugins';

export default defineConfig({
	retries: 3,
	e2e: {
		baseUrl: 'http://localhost:5173',
		setupNodeEvents(on, config) {
			plugin(on, config);

			on(
				'file:preprocessor',
				vitePreprocessor({
					configFile: path.resolve(__dirname, './vite.config.ts'),
					mode: 'test',
				}),
			);
		},
		specPattern: 'cypress/integrations/**/*.cy.ts',
		testIsolation: false,
		experimentalRunAllSpecs: true,
		defaultCommandTimeout: 10000,
		chromeWebSecurity: false,
	},
	viewportWidth: 1920,
	viewportHeight: 1080,
});
