import { billResults } from "../fixtures/billDTO";

export const billRoutes = (server) => {
    server.namespace("/bills", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.id) {
                case "fail":
                    res.status(400);
                    break;
                default:
                    res.status(201);
                    break;
            }
        });

        server.get("/pending").intercept((req, res) => {
            const code = req.query.patient_code;
            res.status(201).json(billResults.filter(
                item => {
                    return (+code === 0 || item.patient.code === +code) && item.status === "O"
                }
            ))
        });

        server.get("/").intercept((req, res) => {
            const code = req.query.patient_code;
            const datefrom = req.query.datefrom;
            const dateto = req.query.dateto;
            res.status(201).json(billResults.filter(
                item => {
                    const check = (+code === 0 || item.patient.code === +code) &&
                        !datefrom || (+item.date >= +datefrom && +item.date <= +dateto);
                    return check;
                }
            ))
        });
    });
};
