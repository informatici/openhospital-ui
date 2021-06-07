import disease1DTO from "../fixtures/diseaseDTO";

export const therapyRoutes = (server) => {
    server.namespace("/diseases", () => {
        server.get("/all").intercept((req, res) => {
            const code = req.params.codePatient;
            switch (code) {
                case "5":
                    res.status(400);
                    break;
                case "2":
                    res.status(204);
                    res.body = null;
                    break;
                default:
                    res.status(200).json([disease1DTO, disease1DTO, disease1DTO, disease1DTO]);
            }
        });
    });
};