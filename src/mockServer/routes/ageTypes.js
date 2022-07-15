import { ageTypeDTO } from "../fixtures/ageTypeDTO";

export const ageTypeRoutes = (server) => {
  server.namespace("/agetypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(ageTypeDTO);
    });
  });
};
