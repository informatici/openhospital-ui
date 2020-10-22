import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "../generated/runtime";
import patientDTO from "./fixtures/patientDTO";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true,
  });
  const { server } = polly;

  server.host(BASE_PATH, () => {
    server.namespace("/auth", () => {
      server.post("/login").intercept((req, res) => {
        res.status(200).json({
          displayName: "John Doe",
          token: "1qrj12fcxu3a21d21pjvba6g1",
        });
      });
    });

    server.namespace("/patients", () => {
      server.post("/").intercept((req, res) => {
        const body = req.jsonBody();
        if (body.firstName === "fail") {
          res.status(400);
        } else {
          res.status(201);
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

      server.get("/search").intercept((req, res) => {
        if (req.query.firstName === "empty") {
          res.status(200).json([]);
        } else if (req.query.firstName === "unexpected") {
          res.status(200).json({});
        } else if (req.query.firstName === "fail") {
          res.status(400);
        } else {
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
  });

  return server;
}
