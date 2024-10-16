import { userGroupsDTO } from "../fixtures/userGroupsDTO";

export const userGroupRoutes = (server) => {
  server.namespace("/usergroups", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(userGroupsDTO);
    });
    server.get("/:id").intercept((req, res) => {
      console.log(req.params.id);
      const group = userGroupsDTO.find(({ code }) => code === req.params.id);
      if (!group) {
        return res.status(404).json({
          status: "BAD_REQUEST",
          message: "User group not found.",
          debugMessage: "User group not found.",
          timestamp: "2024-09-16T08:02:53.878312662",
          description: null,
        });
      }
      res.status(200).json(group);
    });

    server.delete("/:code/permissions/:id").intercept((_req, res) => {
      res.status(200).json(true);
    });
    server.post("/:code/permissions/:id").intercept((_req, res) => {
      res.status(200).json(true);
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
