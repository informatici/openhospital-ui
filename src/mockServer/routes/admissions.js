import { admissionDTO } from "../fixtures/admissionDTO";

const dischargeProps = {
  disDate: "2021-08-27T10:19:44.000Z",
  disType: { code: "F", description: "FUGUE" },
};

const admissions = [
  admissionDTO,
  admissionDTO,
  admissionDTO,
  {
    ...admissionDTO,
    ...dischargeProps,
    patient: { ...admissionDTO.patient, sex: "F", agetype: "d3" },
  },
  { ...admissionDTO, ...dischargeProps },
  {
    ...admissionDTO,
    patient: { ...admissionDTO.patient, sex: "F", agetype: "d2" },
    ...dischargeProps,
  },
  {
    ...admissionDTO,
    ...dischargeProps,
    disType: { code: "N", description: "NORMALE" },
  },
];

export const admissionRoutes = (server) => {
  server.namespace("/admissions", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.admDate) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201).json(body);
          break;
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.note) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(200).json(body);
          break;
      }
    });
    server.get("/").intercept((req, res) => {
      res.status(200).json({ data: admissions, pageInfo: {} });
    });
    server.get("/patient/:patientCode").intercept((req, res) => {
      const code = req.query.patientCode;
      switch (code) {
        case "10000":
          res.status(400);
          break;
        case "21266":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(admissions);
      }
    });
    server.get("/current").intercept((req, res) => {
      const code = req.query.patientCode;
      switch (code) {
        case "50":
          res.status(400);
          break;
        case "21266":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json({ ...admissionDTO, id: 0 });
      }
    });
    server.post("/discharge").intercept((req, res) => {
      const body = req.jsonBody();

      switch (body.note) {
        case "fail":
          res.status(400).json(null);
          break;
        default:
          res.status(200).json(null);
      }
    });
  });
  server.namespace("/discharges", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json({ data: admissions, pageInfo: {} });
    });
  });
};
