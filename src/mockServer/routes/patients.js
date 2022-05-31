import patientDTO, { patientDTO2 } from "../fixtures/patientDTO";
import patientDTOOut from "../fixtures/patientDTOOut";

export const patientRoutes = (server) => {
  server.namespace("/patients", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.firstName) {
        case "fail":
          res.status(400);
          break;
        default:
<<<<<<< HEAD
          res.status(201).json(patientDTO);
=======
          res.status(201).json(body);
>>>>>>> f6844f06 (improvement(OH2-70): Update mock server, update app state and api spec file)
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
        case "1234563":
          res.status(200).json(patientDTOOut);
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
              patientDTO2,
            ]);
      }
    });
  });
};
