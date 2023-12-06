import permissionList from "../fixtures/permissionList";

export const userRoutes = (server) => {
  server.namespace("/users", () => {
    server.get("/me").intercept((req, res) => {
      res.status(200).json({
        userName: "admin",
        permissions: permissionList,
        userGroupName: "ADMIN",
        userDesc: "John Doe",
      });
    });
    server.get("/settings").intercept((req, res) => {
      res
        .status(200)
        .json([{ id: 1, configName: "landing", configValue: "/" }]);
    });
  });
};
