import { Polly } from "@pollyjs/core";
import XHRAdapter from "@pollyjs/adapter-xhr";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    logging: true,
  });
  const { server } = polly;

  server.host("https://www.open-hospital.org/oh-api", () => {
    server.namespace("/auth", () => {
      server.post("/login").intercept((req, res) => {
        res
          .status(200)
          .setHeader(
            "set-cookie",
            "JSESSIONID=1qrj12fcxu3a21d21pjvba6g1;Path=/oh-api"
          )
          .json({
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
