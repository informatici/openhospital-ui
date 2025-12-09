import { WARD_MEDICALS } from "mockServer/fixtures/wardMedicals";
import { MOVEMENTS } from "../fixtures/stockMovements";
import { WARD_MOVEMENTS } from "../fixtures/stockWardMovements";

export const stockMovementsRoutes = (server) => {
  server.namespace("/stockmovements", () => {
    server.get("/").intercept((_, res) => {
      res.status(200).json(MOVEMENTS);
    });
    server.post("/charge").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body[0].refNo) {
        case 0:
          res.status(400);
          break;
        default:
          res.status(201).json(true);
          break;
      }
    });
  });
  server.namespace("/medicalstockward", () => {
    server.get("/:code").intercept((req, res) => {
      const code = req.params.code;
      res
        .status(200)
        .json(WARD_MEDICALS.filter((ward) => ward.id?.ward?.code === code));
    });
  });
  server.namespace("/medicalstockward/movements", () => {
    server.get("/:code").intercept((req, res) => {
      const code = req.params.code;
      res
        .status(200)
        .json(
          WARD_MOVEMENTS.filter((movement) =>
            [movement.ward, movement.wardFrom, movement.wardTo].some(
              (ward) => ward?.code === code
            )
          )
        );
    });
  });

   server.post("/medicalstockward/movements").intercept((req, res) => {
     const body = req.jsonBody();
     const description = body.description;
     const isPatient = body.isPatient;
     const medical = body.medical;
     const lot = body.lot;

     const errors = [];

     if (isPatient && (!description || description.trim() === "")) {
       errors.push("please select a patient");
     }

     if (!isPatient && (!description || description.trim() === "")) {
       errors.push("please insert a description for the internal use");
     }

     if (!medical) {
       errors.push("please select a drug");
     }

     if (!lot) {
       errors.push("please select a lot");
     }

     if (errors.length > 0) {
       return res.status(400).json({ success: false, errors });
     }

     const newMovement = { ...body, code: WARD_MOVEMENTS.length + 1 };
     WARD_MOVEMENTS.push(newMovement);

     res.status(201).json(true);
   });
};
