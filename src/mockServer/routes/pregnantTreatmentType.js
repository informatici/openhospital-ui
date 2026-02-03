import { pregnantTreatmentTypeDTO } from "../fixtures/pregnantTreatmentDTO";

export const pregnantTreatmentTypeRoutes = (server) => {
  server.namespace("/pregnanttreatmenttypes", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(pregnantTreatmentTypeDTO);
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res
            .status(400)
            .json({ message: "Fail to create pregnant treatment type" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/:code").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res
            .status(400)
            .json({ message: "Fail to update pregnant treatment  type" });
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
            .json({ message: "Fail to delete pregnant treatment  type" });
          break;
        default:
          res.status(200).json(true);
      }
    });
  });
};
