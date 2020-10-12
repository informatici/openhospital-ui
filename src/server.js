import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "./generated/runtime";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true
  });
  const { server } = polly;

  server.host(BASE_PATH, () => {
    server.namespace("/auth", () => {
      server.post("/login").intercept((req, res) => {
        res.status(200).json({
          authenticated: true,
          authorities: [
            {
              authority: "Administrator",
            },
          ],
          credentials: {},
          details: {},
          name: "Marco Rossi",
          principal: {},
        });
      });
    });

    server.namespace("/patients", () => {
      server.post("/").intercept((req, res) => {
        res.status(201);
      });

      server.get("/search").intercept((req, res) => {
        res.status(200).json([{
          firstName: 'Mario',
          secondName: 'Rossi'
        }, {
          firstName: 'Marco',
          secondName: 'Bianchi'
        }, {
          firstName: 'Luca',
          secondName: 'Ferrari'
        }]);
      });
    });
  });

  return server;
}
