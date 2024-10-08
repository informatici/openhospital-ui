import { examRequestDTO } from "mockServer/fixtures/examRequestDTO";

export const labExamRequestRoutes = (server) => {
  server.namespace("/laboratories/examRequest", () => {
    server.get("/patient/:id").intercept((req, res) => {
      res.status(200).json(examRequestDTO);
    });
    server.post("/").intercept((req, res) => {
      let body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create lab exam request" });
          break;
        default:
          res.status(200).json(body);
      }
    });
  });
};
