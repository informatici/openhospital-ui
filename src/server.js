import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "./generated/runtime";

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
        res.status(201);
      });
    });
  });

  return server;
}
