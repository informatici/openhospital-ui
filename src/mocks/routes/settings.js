export const settingsRoutes = (server) => {
	server.namespace('/usersettings', () => {
		server.get('/').intercept((_req, res) => {
			res
				.status(200)
				.json([{ id: 1, configName: 'landing', configValue: '/' }]);
		});
		server.get('/dashboard').intercept((_req, res) => {
			res.status(200).json({}); // TODO: Add a response body from api. Missing api definition.
		});
	});
};
