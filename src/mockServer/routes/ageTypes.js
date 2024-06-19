import { ageTypeDTO } from "../fixtures/ageTypeDTO";

export const ageTypeRoutes = (server) => {
  server.namespace("/agetypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(ageTypeDTO);
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update age type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
  });
};
