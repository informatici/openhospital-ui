import { billDTO, billDTO1, pendingBillDTO } from "../fixtures/billDTO";

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
            const code = req.params.patientCode;

            switch (code) {
                case "1":
                    res.status(201).json([billDTO1]);
                    break;
                default:
                    res.status(201).json([pendingBillDTO, pendingBillDTO]);
                    break;
            }
        });
        server.get("/").intercept((req, res) => {
            const code = req.params.patientCode;

            switch (code) {
                case "1":
                    res.status(201).json([billDTO1]);
                    break;
                default:
                    res.status(201).json([billDTO, billDTO]);
                    break;
            }

        });
    });
};
