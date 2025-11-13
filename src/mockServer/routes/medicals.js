import { MEDICALS } from "mockServer/fixtures/medicals";

let medicals = [...MEDICALS];

export const medicalRoutes = (server) => {
  server.namespace("/medicals", () => {
    server.get("/").intercept((req, res) => {
      const code = req.params.code;

      switch (code) {
        case "1":
          res.status(400).json({ message: "Bad request" });
          break;
        case "2":
          res.status(204);
          res.body = null;
          break;
        default:
          res.status(200).json(medicals);
      }
    });

    server.post("/").intercept((req, res) => {
      try {
        const body =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        if (!body || !body.prodCode || !body.description) {
          return res.status(400).json({ message: "Invalid data" });
        }

        const newMedical = {
          id: medicals.length + 1,
          ...body,
          createdAt: new Date().toISOString(),
        };

        medicals.push(newMedical);

        return res.status(200).json(newMedical);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      }
    });
  });
};
