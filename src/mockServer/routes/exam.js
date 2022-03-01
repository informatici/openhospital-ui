import { examsDTO } from "../fixtures/examsDTO";

export const examRoutes = (server) => {
    server.namespace("/exams", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json(examsDTO);
        });
    });
}