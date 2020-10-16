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
        res
          .status(200)
          .setHeader(
            "set-cookie",
            "JSESSIONID=1qrj12fcxu3a21d21pjvba6g1;Path=/oh-api"
          )
          .json({
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
          });
      });
    });

    server.namespace("/patients", () => {
      server.post("/").intercept((req, res) => {
        res.status(201);
      });

      server.get("/search").intercept((req, res) => {
        if (req.query.firstName === "empty") {
          res.status(200).json([]);
        } else if (req.query.firstName === "fail") {
          res.status(400);
        } else {
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
        }
      });
    });
  });

  return server;
}
