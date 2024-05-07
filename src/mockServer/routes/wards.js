import { wards } from "../fixtures/wardDTO";

export const wardsRoutes = (server) => {
  server.namespace("/wards", () => {
    server.get("/").intercept((req, res) => {
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
          res.status(200).json(wards);
      }
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create ward" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update ward" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update ward" });
          break;
        default:
          res.status(200);
      }
    });
  });
};
