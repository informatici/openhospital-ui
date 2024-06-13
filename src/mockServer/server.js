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
import { diseaseTypeRoutes } from "./routes/diseaseTypes";
import { ageTypeRoutes } from "./routes/ageTypes";
import { therapyRoutes } from "./routes/therapies";
import { medicalRoutes } from "./routes/medicals";
import { admissionRoutes } from "./routes/admissions";
import { admissionTypesRoutes } from "./routes/admissionTypes";
import { dischargeTypesRoutes } from "./routes/dischargeTypes";
import { wardsRoutes } from "./routes/wards";
import { labRoutes } from "./routes/lab";
import { examRoutes } from "./routes/exam";
import { examRowRoutes } from "./routes/examRow";
import { examTypesRoutes } from "./routes/examTypes";
import { billRoutes } from "./routes/bill";
import { pricesRoutes } from "./routes/prices";
import { operationRoutes } from "./routes/operations";
import { hospitalRoutes } from "./routes/hospital";
import { operationTypeRoutes } from "./routes/operationTypes";
import { vaccineRoutes } from "./routes/vaccine";
import { vaccineTypesRoutes } from "./routes/vaccineTypes";
import { deliveryTypesRoutes } from "./routes/deliveryTypes";
import { suppliersRoutes } from "./routes/suppliers";

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
    examRoutes(server);
    examTypesRoutes(server);
    labRoutes(server);
    examRowRoutes(server);
    pricesRoutes(server);
    billRoutes(server);
    operationRoutes(server);
    diseaseTypeRoutes(server);
    ageTypeRoutes(server);
    hospitalRoutes(server);
    operationTypeRoutes(server);
    vaccineRoutes(server);
    vaccineTypesRoutes(server);
    suppliersRoutes(server);
    deliveryTypesRoutes(server);
  });
  return server;
}
