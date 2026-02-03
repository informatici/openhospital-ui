import { examTypesDTO } from "../fixtures/examTypesDTO";

export const examTypesRoutes = (server) => {
  server.namespace("/examtypes", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(examTypesDTO);
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create exam type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/:code").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update exam type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to delete exam type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
