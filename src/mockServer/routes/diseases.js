import { diseasesDTO } from "../fixtures/diseasesDTO";

export const diseasesRoutes = (server) => {
  server.namespace("/diseases", () => {
    server.get("/all").intercept((req, res) => {
      res.status(200).json(diseasesDTO);
    });
    server.get("/opd").intercept((req, res) => {
      res.status(200).json(diseasesDTO.filter(({ opdInclude }) => opdInclude));
    });
    server.get("/ipd/in").intercept((req, res) => {
      res
        .status(200)
        .json(diseasesDTO.filter(({ ipdInInclude }) => ipdInInclude));
    });
    server.get("/ipd/out").intercept((req, res) => {
      res
        .status(200)
        .json(diseasesDTO.filter(({ ipdOutInclude }) => ipdOutInclude));
    });
    server.post("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create disease" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.put("/").intercept((req, res) => {
      const body = req.jsonBody();
      switch (body.description) {
        case "FAIL":
          res.status(400).json({ message: "Fail to update disease" });
          break;
        default:
          res.status(200).json(body);
      }
    });
  });
};
