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
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY",
          });
          break;
      }
    });
    server.post("/logout").intercept((req, res) => {
      res.status(200);
    });
  });
};
