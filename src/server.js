import XHRAdapter from "@pollyjs/adapter-xhr";
import { Polly } from "@pollyjs/core";
import { BASE_PATH } from "./generated/runtime";

export function makeServer() {
  Polly.register(XHRAdapter);
  const polly = new Polly("api-mocking", {
    adapters: ["xhr"],
    mode: "passthrough",
    logging: true,
  });
  const { server } = polly;

  server.host(BASE_PATH, () => {
    server.namespace("/auth", () => {
      server.post("/login").intercept((req, res) => {
        res.status(200).json({
          displayName: "John Doe",
          token: "1qrj12fcxu3a21d21pjvba6g1",
        });
      });
    });

    server.namespace("/patients", () => {
      server.post("/").intercept((req, res) => {
        const body = req.jsonBody();
        switch (body.firstName) {
          case "fail":
            res.status(400);
            break;
          default:
            res.status(201);
            break;
        }
      });

      server.get("/search").intercept((req, res) => {
        switch (req.query.firstName) {
          case "empty":
            res.status(200).json([]);
            break;
          case "unexpected":
            res.status(200).json({});
            break;
          case "fail":
            res.status(400);
            break;
          default:
            res.status(200).json([
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
              {
                firstName: "Mario",
                secondName: "Rossi",
                birthDate: "12/12/1980",
                age: 40,
                agetype: "year",
                sex: "M",
                address: "Via Roma, 4",
                city: "Milano",
                telephone: "3335678455",
                note: "",
                mother_name: "Rosa",
                mother: "D",
                father_name: "Luigi",
                father: "D",
                bloodType: "A+",
                hasInsurance: "Y",
                parentTogether: "Y",
                taxCode: 1578965,
                height: 180,
                weight: 80,
              },
            ]);
            break;
        }
      });
    });
  });

  return server;
}
