import { examsDTO } from "../fixtures/examsDTO";

export const examRoutes = (server) => {
  server.namespace("/exams", () => {
    server.get("/").intercept((req, res) => {
      res.status(200).json(examsDTO);
    });
    server.post("/").intercept((req, res) => {
      let body = req.jsonBody();
      switch (body.code) {
        case "FAIL":
          res.status(400).json({ message: "Fail to create exam" });
          break;
        default:
          res.status(200).json(body);
      }
    });
    server.delete("/:code").intercept((req, res) => {
      const { code } = req.params;
      switch (code) {
        case "01.04":
          res.status(400);
          break;
        default:
          res.status(200);
          break;
      }
    });
  });
};
