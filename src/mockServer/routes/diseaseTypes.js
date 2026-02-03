import { diseaseTypesDTO } from "../fixtures/diseaseTypesDTO";

export const diseaseTypeRoutes = (server) => {
  server.namespace("/diseasetypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(diseaseTypesDTO);
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create disease type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update disease type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to delete disease type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
