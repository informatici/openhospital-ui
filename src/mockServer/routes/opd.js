import opdDTO from "../fixtures/opdDTO";
export const opdRoutes = (server) => {
    server.namespace("/opds", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.patientCode && body.date) {
                case "fail":
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
    });
};