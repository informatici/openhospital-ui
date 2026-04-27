export const API_BASE_URL =
	import.meta.env.VITE_BASE_PATH || 'http://localhost:5174/';
export const PLUGIN_ASSETS_BASE_URL = `${API_BASE_URL}/assets/plugins`.replace(
	'//assets',
	'/assets',
);
