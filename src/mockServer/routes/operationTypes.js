import { operationTypesDTO } from "../fixtures/operationTypeDTO";

export const operationTypeRoutes = (server) => {
  server.namespace("/operationtypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(operationTypesDTO);
    });
  });
};
