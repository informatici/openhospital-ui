import visitDTO from "../fixtures/visitDTO";

export const visitRoutes = (server) => {
    server.namespace("/visit", () => {
        server.get("/:patID").intercept((req, res) => {
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
                    res.status(200).json([visitDTO, visitDTO, visitDTO]);
            }
        });
    });
};
