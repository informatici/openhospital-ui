import { permissionDTO } from "../fixtures/permissionDTO";

export const permissionRoutes = (server) => {
  server.namespace("/permissions", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(permissionDTO);
    });
  });
};
