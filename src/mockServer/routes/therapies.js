import { format } from "date-fns";
import therapyDTO from "../fixtures/therapyDTO";

export const therapyRoutes = (server) => {
    server.namespace("/therapies", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            body.startDate = format(new Date(+body.startDate), "yyyy-MM-dd HH:mm:ss");
            body.endDate = format(new Date(+body.endDate), "yyyy-MM-dd HH:mm:ss");
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
                case "10000":
                    res.status(400);
                    break;
                case "21266":
                    res.status(204);
                    res.body = null;
                    break;
                default:
                    res.status(200).json([therapyDTO, therapyDTO, therapyDTO, therapyDTO]);
            }
        });
    });
};
