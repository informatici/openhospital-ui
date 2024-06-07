import { diseaseTypesDTO } from "../fixtures/diseaseTypesDTO";

export const diseaseTypeRoutes = (server) => {
  server.namespace("/diseasetypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(diseaseTypesDTO);
    });
  });
};
