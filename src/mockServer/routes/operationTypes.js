import { operationTypesDTO } from "../fixtures/operationTypeDTO";

export const operationTypeRoutes = (server) => {
  server.namespace("/operationtypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(operationTypesDTO);
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create operation type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/:code").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update operation type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to delete operation type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
