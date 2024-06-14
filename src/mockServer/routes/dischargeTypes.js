import { dischargeTypesDTO } from "../fixtures/dischargeTypesDTO";

export const dischargeTypesRoutes = (server) => {
    server.namespace("/dischargetypes", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(dischargeTypesDTO);
        });
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to create discharge type" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.put("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to update discharge type" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.delete("/:code").intercept((req, res) => {
            const code = req.params.code;
            switch (code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to delete discharge type" });
                    break;
                default:
                    res.status(200).json(true);
            }
        });
    });
};
