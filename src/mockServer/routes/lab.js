import { labDTO } from "../fixtures/laboratoryDTO";
import { materialsDTO } from "../fixtures/materialsDTO";

export const labRoutes = (server) => {
  server.namespace("/laboratories", () => {
    server.get("/byPatientId/:patId").intercept((req, res) => {
      const code = req.params.patId;
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "2000":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(labDTO);
      }
    });

    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.laboratoryDTO.note) {
        case "ERROR":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });

    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "-1":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });

    server.put("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "-1":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });

    server.get("/materials").intercept((req, res) => {
      res.status(200).json(materialsDTO);
    });
  });
};
