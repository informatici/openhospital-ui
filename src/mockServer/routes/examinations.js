import patientExaminationDTO from "../fixtures/patientExaminationDTO";

export const examinationsRoutes = (server) => {
    server.namespace("/examinations", () => {
        server.post("/").intercept((req, res) => {
            const body = req.jsonBody();
            switch (body.patientCode) {
                case "fail":
                    res.status(400);
                    break;
                default:
                    res.status(201);
                    break;
            }
        });
        server.get("/byPatientId/:patId").intercept((req, res) => {
            const code = req.params.code;
            switch (code) {
                case "1":
                    res.status(400);
                    break;
                case "2":
                    res.status(204);
                    res.body = null;
                    break;
                default:
                    res.status(200).json([patientExaminationDTO,
                        patientExaminationDTO, patientExaminationDTO, patientExaminationDTO
                    ]);
            }
        });
    });
};
