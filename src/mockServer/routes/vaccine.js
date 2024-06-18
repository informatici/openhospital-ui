import { vaccineDTO } from "../fixtures/vaccineDTO";

export const vaccineRoutes = (server) => {
    server.namespace("/vaccines", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(vaccineDTO);
        });
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to create vaccine" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.put("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to update vaccine" });
                    break;
                default:
                    res.status(200).json(body);
            }
        });
        server.delete("/:code").intercept((req, res) => {
            const code = req.params.code;
            switch (code) {
                case "FAIL":
                    res.status(400).json({ message: "Fail to delete vaccine" });
                    break;
                default:
                    res.status(200).json(true);
            }
        });
    });
}