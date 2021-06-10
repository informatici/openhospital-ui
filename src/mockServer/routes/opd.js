import opdDTO from "../fixtures/opdDTO";

export const visitRoutes = (server) => {
    server.namespace("/opds", () => {
        server.get("/patient/:pcode").intercept((req, res) => {
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
                    res.status(200).json([opdDTO, opdDTO, opdDTO, opdDTO]);
            }
        });
    });
};