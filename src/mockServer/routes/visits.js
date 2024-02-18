import visitDTO from "../fixtures/visitDTO";

export const visitRoutes = (server) => {
  server.namespace("/visit", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.duration) {
        case 100:
          res.status(400);
          break;
        case 30:
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(201).json(body);
      }
    });
    server.put("/:visitID").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.duration) {
        case 100:
          res.status(400);
          break;
        case 30:
          res.status(404);
          res.body = null;
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.get("/patient/:patID").intercept((req, res) => {
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
          res.status(200).json([visitDTO, visitDTO, visitDTO]);
      }
    });
  });

  server.namespace("/visits", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.length) {
        case "0":
          res.status(400);
          break;
        case "2":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(201).json(body);
      }
    });
  });
};
