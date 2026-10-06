import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const publicUrl = process.env.VITE_PUBLIC_URL || env.VITE_PUBLIC_URL || '/';

	return {
		base: publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`,
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
			dedupe: ['@emotion/react', '@emotion/styled'],
		},
		build: {
			outDir: 'build',
		},
		css: {
			preprocessorOptions: {
				scss: {
					quietDeps: true,
					loadPaths: [path.resolve(__dirname, 'node_modules')],
				},
			},
		},
		plugins: [
			react({
				babel: {
					plugins: ['@emotion/babel-plugin'],
				},
			}),
			svgr(),
		],
		define: {
			global: 'globalThis',
		},
	};
});
