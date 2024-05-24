import vaccineTypesDTO from "../fixtures/vaccineTypesDTO";

export const vaccineTypesRoutes = (server) => {
  server.namespace("/vaccinetypes", () => {
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
          res.status(200).json(vaccineTypesDTO);
      }
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create vaccine type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update vaccine type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update vaccine type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
