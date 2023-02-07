export const dischargeTypesRoutes = (server) => {
    server.namespace("/dischargetypes", () => {
        server.get("/").intercept((req, res) => {
            res.status(200).json([
                {
                    "code": "N",
                    "description": "NORMALE"
                },
                {
                    "code": "T",
                    "description": "TRANSFERT"
                },
                {
                    "code": "F",
                    "description": "FUGUE"
                }
            ]);
        });
    });
};
