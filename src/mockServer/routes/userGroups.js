import { userGroupsDTO } from "../fixtures/userGroupsDTO";

export const userGroupRoutes = (server) => {
  server.namespace("/users/groups", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(userGroupsDTO);
    });
    server.post("/").intercept((_req, res) => {
      res.status(200).json(userGroupsDTO[0]);
    });
    server.put("/").intercept((_req, res) => {
      res.status(200).json(userGroupsDTO[0]);
    });
    server.delete("/:id").intercept((_req, res) => {
      res.status(200).json(true);
    });
  });
};
