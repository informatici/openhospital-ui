import { examTypesDTO } from "../fixtures/examTypesDTO";

export const examTypesRoutes = (server) => {
  server.namespace("/examtypes", () => {
    server.get("/").intercept((_req, res) => {
      res.status(200).json(examTypesDTO);
    });
  });
};
