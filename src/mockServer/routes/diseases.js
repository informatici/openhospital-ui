import { diseasesDTO } from "../fixtures/diseasesDTO";

export const diseasesRoutes = (server) => {
  server.namespace("/diseases", () => {
    server.get("/all").intercept((_req, res) => {
      res.status(200).json(diseasesDTO);
    });
    server.get("/opd").intercept((_req, res) => {
      res.status(200).json(diseasesDTO.filter(({ opdInclude }) => opdInclude));
    });
    server.get("/ipd/in").intercept((_req, res) => {
      res
        .status(200)
        .json(diseasesDTO.filter(({ ipdInInclude }) => ipdInInclude));
    });
    server.get("/ipd/out").intercept((_req, res) => {
      res
        .status(200)
        .json(diseasesDTO.filter(({ ipdOutInclude }) => ipdOutInclude));
    });
  });
};
