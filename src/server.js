import { Server, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,
    urlPrefix: "http://www.open-hospital.org/oh-api",
    routes() {
      this.namespace = "/auth";

      this.post("/login", (schema, request) => {
        return {
          authenticated: true,
          authorities: [
            {
              authority: "Administrator",
            },
          ],
          credentials: {},
          details: {},
          name: "Marco Rossi",
          principal: {},
        };
      });

      this.post("/logout", (schema) => {
        return schema.authentication.find("Mario Rossi").destroy();
      });
    },
  });
  return server;
}
