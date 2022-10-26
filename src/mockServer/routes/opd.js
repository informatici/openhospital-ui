import opdDTO from "../fixtures/opdDTO";
export const opdRoutes = (server) => {
  server.namespace("/opds", () => {
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.note) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });
    server.put("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "100":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });
    server.get("/patient/:pcode").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "200000":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json([opdDTO, opdDTO, opdDTO, opdDTO]);
      }
    });
    server.get("/search").intercept((req, res) => {
      const code = req.query.patientCode;
      switch (code) {
        case "1000":
          res.status(400);
          break;
        case "200000":
          res.status(204);
          res.body = null;
          break;
        default:
          if (code >= 0) {
            res.status(200).json([opdDTO, opdDTO, opdDTO]);
          } else res.status(200).json([
            opdDTO, { ...opdDTO, sex: "F", ageType: "d1" }, { ...opdDTO, sex: "F", ageType: "d1" },
            { ...opdDTO, sex: "F", ageType: "d4" }, { ...opdDTO, sex: "M", ageType: "d4" },
            { ...opdDTO, sex: "F", ageType: "d2" }, { ...opdDTO, sex: "M", ageType: "d3" },
            { ...opdDTO, sex: "M", ageType: "d2" }, { ...opdDTO, sex: "M", ageType: "d2" }, { ...opdDTO, sex: "M", ageType: "d2" },
            { ...opdDTO, sex: "F", ageType: "d5" }, { ...opdDTO, sex: "M", ageType: "d5" }
          ]);
      }
    });

    server.delete("/:code").intercept((req, res) => {
      const code = req.params.code;
      switch (code) {
        case "fail":
          res.status(400);
          break;
        default:
          res.status(201);
          break;
      }
    });
  });
};
