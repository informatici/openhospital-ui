import { therapyRowDTO } from "../fixtures/therapyRowDTO";

export const therapiesRoutes = (server) => {
  server.namespace("/therapies", () => {
    server.post("/").intercept((req, res) => {
      res.status(200).json(therapyRowDTO);
    });
  });
};
