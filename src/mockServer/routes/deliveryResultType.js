import { deliveryResultTypeDTO } from "../fixtures/deliveryResultTypeDTO";

export const deliveryResultTypeRoutes = (server) => {
  server.namespace("/deliveryresulttypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(deliveryResultTypeDTO);
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res
            .status(400)
            .json({ message: "Fail to create delivery result type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res
            .status(400)
            .json({ message: "Fail to update delivery result type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "FAIL":
          res
            .status(400)
            .json({ message: "Fail to delete delivery result type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
