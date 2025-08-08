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
  server.get("/reports/patientexamrequest/:patientId", (req, res, ctx) => {
    const { patientId } = req.params;
    if (patientId === "FAIL") {
      return res(
        ctx.status(400),
        ctx.json({ message: "Fail to generate exam request PDF" })
      );
    }
    return res(
      ctx.status(200),
      ctx.body(new Blob(["fake pdf content"], { type: "application/pdf" }))
    );
  });
};
