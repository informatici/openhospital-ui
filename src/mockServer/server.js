import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "../generated/runtime";
import patientDTO from "./fixtures/patientDTO";
import patientExaminationDTO from "./fixtures/patientExaminationDTO";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true,
  });
  const { server } = polly;

  server.host(BASE_PATH, () => {

    // AUTH
    server.namespace("/auth", () => {
      server.post("/login").intercept((req, res) => {
        const { username } = req.query;
        switch (username) {
          case "fail":
            res.status(401);
            break;
          default:
            res.status(200).json({
              displayName: "John Doe",
              token: "1qrj12fcxu3a21d21pjvba6g1",
            });
            break;
        }
      });
    });

    // PATIENTS
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

    // EXAMINATIONS (AKA TRIAGE)
    server.namespace("/examinations", () => {
      server.post("/").intercept((req, res) => {
        const body = req.jsonBody();
        switch (body.pex_ID) {
          case -1:
            res.status(400);
            break;
          default:
            res.status(201);
            break;
        }
      });

      server.post("/byPatientId/:patId").intercept((req, res) => {
        const patId = req.params.patId;
        switch (patId) {
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
                patientExaminationDTO,
                patientExaminationDTO,
                patientExaminationDTO,
                patientExaminationDTO,
                patientExaminationDTO,
                patientExaminationDTO,
              ]);
        }
      });
    });
  });

  return server;
}
