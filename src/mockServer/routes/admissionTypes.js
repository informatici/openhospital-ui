export const admissionTypesRoutes = (server) => {
    server.namespace("/admissiontypes", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json([
                {
                    "code": "A",
                    "description": "AMBULANCE"
                },
                {
                    "code": "R",
                    "description": "REFERRAL"
                },
                {
                    "code": "I",
                    "description": "SELF"
                }
            ]);

        });
    });
};
