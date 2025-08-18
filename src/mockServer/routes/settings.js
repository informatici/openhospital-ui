export const settingsRoutes = (server) => {
  server.namespace("/settings", () => {
    server.get("/").intercept((_, res) => {
      res.status(200).json([
        {
          id: 2,
          code: "ENCOUNTERS_ENABLED",
          category: "general",
          value: "TRUE",
        },
      ]);
    });
  });
  server.namespace("/usersettings", () => {
    server.get("/").intercept((req, res) => {
      res
        .status(200)
        .json([{ id: 1, configName: "landing", configValue: "/" }]);
    });
    server.get("/dashboard").intercept((req, res) => {
      res.status(200).json({}); // TODO: Add a response body from api. Missing api definition.
    });
  });
};
