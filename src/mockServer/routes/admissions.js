import { format } from "date-fns";
import { admissionDTO } from "../fixtures/admissionDTO";

export const admissionRoutes = (server) => {
    server.namespace("/admissions", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            body.admDate = format(new Date(+body.admDate), "yyyy-MM-dd HH:mm:ss");
            switch (body.admDate) {
                case "fail":
                    res.status(400);
                    break;
                default:
                    res.status(201).json(body);
                    break;
            }
        });
        server.get("?patientcode").intercept((req, res) => {
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
                    res.status(200).json([admissionDTO, admissionDTO, admissionDTO]);
            }
        });
        server.get("/current?patientcode").intercept((req, res) => {
            const code = req.params.patientcode;
            switch (code) {
                case "10000":
                    res.status(400);
                    break;
                case "21266":
                    res.status(204);
                    res.body = null;
                    break;
                default:
                    res.status(200).json(admissionDTO);
            }
        });
    });
};
