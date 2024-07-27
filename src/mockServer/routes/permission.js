import { permissionDTO } from "../fixtures/permissionDTO";

export const permissionRoutes = (server) => {
  server.namespace("/permissions", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(permissionDTO);
    });
    server.put(":id").intercept((_req, res) => {
      res.status(200).json(permissionDTO[0]);
    });
  });
};
