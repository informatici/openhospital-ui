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
    });
};
