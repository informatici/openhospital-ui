import { WARD_MEDICALS } from "mockServer/fixtures/wardMedicals";
import { MOVEMENTS } from "../fixtures/stockMovements";
import { WARD_MOVEMENTS } from "../fixtures/stockWardMovements";

export const stockMovementsRoutes = (server) => {
  server.namespace("/stockmovements", () => {
    server.get("/").intercept((_, res) => {
      res.status(200).json(MOVEMENTS);
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
};
