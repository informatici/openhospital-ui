import therapyDTO from "../fixtures/therapyDTO";

export const therapyRoutes = (server) => {
    server.namespace("/therapies", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.therapyID) {
                case "fail":
                    res.status(400);
                    break;
                default:
                    res.status(201).json(body);
                    break;
            }
        });
        server.get("/:code_patient").intercept((req, res) => {
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
                    res.status(200).json([therapyDTO, therapyDTO, therapyDTO, therapyDTO]);
            }
        });
    });
};
