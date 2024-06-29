import { userGroupsDTO } from "../fixtures/userGroupsDTO";

export const userGroupRoutes = (server) => {
  server.namespace("/users/groups", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(userGroupsDTO);
    });
  });
};
