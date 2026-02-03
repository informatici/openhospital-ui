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
    server.get("/rows/search/patient").intercept((req, res) => {
      res.status(200).json(operationRowsDTO);
    });
    server.get("/rows/search/opd").intercept((req, res) => {
      res.status(200).json(operationRowsDTO);
    });
    server.post("/rows").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.remarks) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201).json(body);
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
          res.status(200).json(body);
          break;
      }
    });
    server.delete("/rows/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(400);
          break;
      }
    });

    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create operation" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/:code").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update operation" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update operation" });
          break;
        default:
          res.status(200);
      }
    });
  });
};
