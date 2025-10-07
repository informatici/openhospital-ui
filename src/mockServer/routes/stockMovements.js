import { MOVEMENTS } from "../fixtures/stockMovements";

export const stockMovementsRoutes = (server) => {
  server.namespace("/stockmovements", () => {
    server.get("/").intercept((_, res) => {
      res
        .status(200)
        .json(MOVEMENTS.map((movement) => ({ ...movement, ward: null })));
    });
  });
};
