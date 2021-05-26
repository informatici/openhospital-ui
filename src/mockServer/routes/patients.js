import patientDTO from "../fixtures/patientDTO";

export const patientRoutes = (server) => {
  server.namespace("/patients", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.firstName) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });

    server.get("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "1234561":
          res.status(400);
          break;
        case "1234562":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(patientDTO);
      }
    });

    server.put("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "1234561":
          res.status(400);
          break;
        case "1234562":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(patientDTO);
      }
    });

    server.get("/search").intercept((req, res) => {
      console.log("search invoked");
      switch (req.query.firstName) {
        case "empty":
          res.status(200).json([]);
          break;
        case "unexpected":
          res.status(200).json({});
          break;
        case "fail":
          res.status(400);
          break;
        default:
          res
            .status(200)
            .json([
              patientDTO,
              patientDTO,
              patientDTO,
              patientDTO,
              patientDTO,
              patientDTO,
            ]);
      }
    });
  });
};
