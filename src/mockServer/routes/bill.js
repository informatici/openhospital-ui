import { billDTO, pendingBillDTO } from "../fixtures/billDTO";

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
            const body = req.params;
            res.status(201).json([pendingBillDTO, pendingBillDTO]);
        });
        server.get("/").intercept((req, res) => {
            const body = req.params;
            res.status(201).json([billDTO, billDTO]);
        });
    });
};
