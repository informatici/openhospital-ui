import { vaccineDTO } from "../fixtures/vaccineDTO";

export const vaccineRoutes = (server) => {
    server.namespace("/vaccines", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(vaccineDTO);
        });
    });
}