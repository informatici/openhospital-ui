import { billResults } from "../fixtures/billDTO";
import billItemDTO, { billItemDTOs } from "../fixtures/billItemDTO";
import billPaymentsDTO, { billPaymentsDTOs } from "../fixtures/billPaymentsDTO";

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
                        (+item.date >= +datefrom && +item.date <= +dateto);
                    return check;
                }
            ))
        });

        server.get("/payments/:bill_id").intercept((req, res) => {
            res.status(201).json(billPaymentsDTOs);
        });

        server.get('/items/:bill_id').intercept((req, res) => {
            res.status(201).json(billItemDTOs);
        });
    });
};
