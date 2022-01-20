
import { billResults } from "../fixtures/billDTO";
import { billItemDTOs } from "../fixtures/billItemDTO";
import { billPaymentsDTOs } from "../fixtures/billPaymentsDTO";

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
                (item) => {
                    return (+code === 1 || item.id == 10 || item.patientDTO.code === +code) && item.status === "O"
                }
            ))
        });

        server.get("/").intercept((req, res) => {
            const code = req.query.patient_code;
            const datefrom = +new Date(req.query.datefrom);
            const dateto = req.query.dateto;
            res.status(201).json(billResults.filter(
                (item) => {
                    return (+code === 0 || item.patientDTO.code === +code)
                        && (!req.query.datefrom || new Date(req.query.datefrom).getFullYear() === new Date(item.date).getFullYear());
                }
            ))
        });

        server.get("/payments/:bill_id").intercept((req, res) => {
            res.status(201).json(billPaymentsDTOs);
        });

        server.get('/items/:bill_id').intercept((req, res) => {
            res.status(201).json(billItemDTOs);
        });

        server.get('/payments').intercept((req, res) => {
            const code = req.query.patient_code;
            const datefrom = req.query.datefrom;
            const dateto = req.query.dateto;
            res.status(200).json(billPaymentsDTOs
                .filter(item => {
                    const bill = billResults.find(bill => bill.id === item.billId);
                    return (+code === 0 || bill.patientDTO.code === +code) //(+item.date >= +datefrom && +item.date <= +dateto) ;
                })
            );

        })

        server.delete("/:id").intercept((req, res) => {
            const code = req.params.id;
            switch (code) {
                case "-1":
                    res.status(400);
                    break;
                default:
                    res.status(201);
                    break;
            }
        });

        server.put("/:id").intercept((req, res) => {
            const code = req.params.id;
            const random = Math.random() * code > 0.5 * code;
            switch (random) {
                case true:
                    res.status(400);
                    break;
                default:
                    res.status(201);
                    break;
            }
        });

    });
};
