import { MEDICALS } from "../fixtures/stockMedicals";

export const stockMedicalsRoutes = (server) => {
  server.namespace("/stockmedicals", () => {
    server.get("/").intercept((_, res) => {
      res
        .status(200)
        .json(MEDICALS.map((medical) => ({ ...medical, ward: null })));
    });
  });
};