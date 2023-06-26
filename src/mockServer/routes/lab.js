import { isEmpty } from "lodash";
import { labDTO } from "../fixtures/laboratoryDTO";
import { labWithRowsDTO } from "../fixtures/labWithRowsDTO";
import { labForPrintDTO } from "../fixtures/laboratoryForPrintDTO";
import { materialsDTO } from "../fixtures/materialsDTO";

export const labRoutes = (server) => {
  server.namespace("/laboratories", () => {
    server.get("/byPatientId/:patId").intercept((req, res) => {
      const code = req.params.patId;
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "2000":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(labWithRowsDTO);
      }
    });

    server.get("/:code").intercept((req, res) => {
      const code = req.params.code;
      const lab = labDTO.find((e) => e.code == code);
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "2000":
          res.status(204);
          res.body = null;
          break;
        default:
          if (isEmpty(lab)) {
            res.status(404);
          } else {
            res.status(200).json(lab);
          }
      }
    });

    server.get("/exams/:code").intercept((req, res) => {
      const code = req.params.code;
      const lab = labWithRowsDTO.find((e) => e.laboratoryDTO.code == code);
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "2000":
          res.status(204);
          res.body = null;
          break;
        default:
          if (isEmpty(lab)) {
            res.status(404);
          } else {
            res.status(200).json(lab);
          }
      }
    });

    server.get("/exams").intercept((req, res) => {
      const code = req.query.patientCode;
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "200000":
          res.status(204);
          res.body = null;
          break;
        default:
          res
            .status(200)
            .json({ data: labWithRowsDTO, pageInfo: { totalPages: 8 } });
      }
    });

    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.laboratoryDTO.note) {
        case "ERROR":
          res.status(400);
          break;
        default:
          res.status(201).json({ laboratoryDTO: body.laboratoryDTO });
          break;
      }
    });

    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "-1":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });

    server.put("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "-1":
          res.status(400);
          break;
        default:
          res.status(201).json(labWithRowsDTO[0]);
          break;
      }
    });

    server.get("/materials").intercept((req, res) => {
      res.status(200).json(materialsDTO);
    });
  });
};
