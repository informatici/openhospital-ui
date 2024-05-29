import { supplierDTO } from "../fixtures/supplierDTO";

export const suppliersRoutes = (server) => {
    server.namespace("/suppliers", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(supplierDTO);
        });
    });
}