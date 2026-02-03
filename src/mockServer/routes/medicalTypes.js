import medicalTypesDTO from "../fixtures/medicalTypesDTO";

export const medicalTypesRoutes = (server) => {
  server.namespace("/medicaltypes", () => {
    server.get("/").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "1":
          res.status(400);
          break;
        case "2":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(medicalTypesDTO);
      }
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create medical type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update medical type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to delete medical type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
