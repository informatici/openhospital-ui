import { MOVEMENTS } from "../fixtures/stockMovements";
import { WARD_MOVEMENTS } from "../fixtures/stockWardMovements";

export const stockMovementsRoutes = (server) => {
  server.namespace("/stockmovements", () => {
    server.get("/").intercept((_, res) => {
      res.status(200).json(MOVEMENTS);
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
