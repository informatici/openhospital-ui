import { examRowsDTO } from "../fixtures/examRowsDTO";
export const examRowRoutes = (server) => {
    server.namespace("/examrows", () => {
        server.get("/byExamCode/:examCode").intercept((req, res) => {
            res.status(200).json(examRowsDTO);
        });
    });
}