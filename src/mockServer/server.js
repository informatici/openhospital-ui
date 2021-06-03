import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "../generated/runtime";
import { authRoutes } from "./routes/auth";
import { examinationsRoutes } from "./routes/examinations";
import { patientRoutes } from "./routes/patients";
import { therapiesRoutes } from "./routes/therapies";
import { userRoutes } from "./routes/users";
import { visitRoutes } from "./routes/visits"
import { therapyRoutes } from "./routes/therapies"
import { opdRoutes } from "./routes/opd";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true,
  });
  const { server } = polly;

  server.host(BASE_PATH, () => {
    authRoutes(server);
    patientRoutes(server);
    userRoutes(server);
    visitRoutes(server);
    examinationsRoutes(server);
    therapyRoutes(server);
    opdRoutes(server);
  });

  return server;
}
