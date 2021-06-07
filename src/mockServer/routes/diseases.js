import { disease1DTO, disease2DTO, disease3DTO, disease4DTO } from "../fixtures/diseaseDTO";

export const diseasesRoutes = (server) => {
    server.namespace("/diseases", () => {
        server.get("/all").intercept((req, res) => {
            res.status(200).json([disease1DTO, disease2DTO, disease3DTO, disease4DTO]);
        });
    });
};