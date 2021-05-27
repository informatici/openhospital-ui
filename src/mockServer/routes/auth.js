export const authRoutes = (server) => {
  server.namespace("/auth", () => {
    server.post("/login").intercept((req, res) => {
      const { username } = req.query;

      switch (username) {
        case "fail":
          res.status(401);
          break;
        default:
          res.status(200).json({
            displayName: "John Doe",
            token: "1qrj12fcxu3a21d21pjvba6g1",
          });
          break;
      }
    });
    server.post("/logout").intercept((req, res) => {
      res.status(200);
    });
  });
};
