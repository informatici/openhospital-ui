import { diseaseTypeDTO } from "../fixtures/diseaseTypeDTO";

export const diseaseTypeRoutes = (server) => {
  server.namespace("/diseasetypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json([diseaseTypeDTO, { ...diseaseTypeDTO, code: "IN", description: "INFECTIONS" }, diseaseTypeDTO, diseaseTypeDTO]);
    });
  });
};
