export const userRoutes = (server) => {
  server.namespace("/users", () => {
    server.get("/me").intercept((req, res) => {
      res.status(200).json({
        userName: "admin",
        permission: [
          "odp.read",
          "odp.create",
          "odp.update",
          "odp.delete",
          "summary.read",
          "summary.create",
          "summary.update",
          "summary.delete",
          "examination.read",
          "examination.create",
          "examination.update",
          "examination.delete",
          "admission.read",
          "admission.create",
          "admission.update",
          "admission.delete",
          "therapy.read",
          "therapy.create",
          "therapy.update",
          "therapy.delete",
          "vaccine.read",
          "vaccine.create",
          "vaccine.update",
          "vaccine.delete",
          "exam.read",
          "exam.create",
          "exam.update",
          "exam.delete",
        ],
      });
    });
  });
};
