import { hospitalDTO } from "../fixtures/hospitalDTO";

export const hospitalRoutes = (server) => {
  server.namespace("/hospitals", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(hospitalDTO);
    });
    server.get("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "1":
          res.status(400);
          break;
        case "2":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(hospitalDTO);
      }
    });
    server.put("/:code").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.description) {
        case "FAIL":
          res.status(400).json({ message: "Invalid payload" });
          break;
        default:
          res.status(200).json(body);
      }
    });
  });
};
