import { admissionTypesDTO } from "../fixtures/admissionsTypesDTO";

export const admissionTypesRoutes = (server) => {
    server.namespace("/admissiontypes", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(admissionTypesDTO);
        });
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to create admission type" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.put("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to update admission type" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.delete("/:code").intercept((req, res) => {
            const code = req.params.code;
            switch (code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to delete admission type" });
                    break;
                default:
                    res.status(200).json(true);
            }
        });
    });
};
