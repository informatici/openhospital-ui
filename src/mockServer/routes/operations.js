import { operationRowsDTO } from "../fixtures/operationRowsDTO";
import { operationsDTO } from "../fixtures/operationsDTO";

export const operationRoutes = (server) => {
  server.namespace("/operations", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(operationsDTO);
    });
    server.get("/rows/search/admission").intercept((req, res) => {
      res.status(200).json(operationRowsDTO);
    });
    server.post("/rows").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.remarks) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });
    server.put("/rows").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.remarks) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(200);
          break;
      }
    });
  });
};
