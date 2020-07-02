import { Polly } from "@pollyjs/core";
import XHRAdapter from "@pollyjs/adapter-xhr";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
  });
  const { server } = polly;

  server.host("http://www.open-hospital.org/oh-api", () => {
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
    });
  });

  return server;
}
