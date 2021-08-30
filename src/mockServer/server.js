import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "../generated/runtime";
import { authRoutes } from "./routes/auth";
import { examinationsRoutes } from "./routes/examinations";
import { patientRoutes } from "./routes/patients";
import { userRoutes } from "./routes/users";
import { visitRoutes } from "./routes/visits";
import { opdRoutes } from "./routes/opd";
import { diseasesRoutes } from "./routes/diseases";
import { therapyRoutes } from "./routes/therapies";
import { medicalRoutes } from "./routes/medicals";
import { admissionRoutes } from "./routes/admissions";
import { admissionTypesRoutes } from "./routes/admissionTypes";
import { dischargeTypesRoutes } from "./routes/dischargeTypes";
import { wardsRoutes } from "./routes/wards";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true,
  });
  const { server } = polly;
  server.host(BASE_PATH, () => {
    userRoutes(server);
    authRoutes(server);
    patientRoutes(server);
    visitRoutes(server);
    examinationsRoutes(server);
    therapyRoutes(server);
    opdRoutes(server);
    diseasesRoutes(server);
    medicalRoutes(server);
    admissionRoutes(server);
    admissionTypesRoutes(server);
    dischargeTypesRoutes(server);
    wardsRoutes(server);
  });
  return server;
}
