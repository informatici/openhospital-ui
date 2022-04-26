import { admissionDTO } from "./admissionDTO";
import opdDTO from "./opdDTO";
import { operationsDTO } from "./operationsDTO";

export const operationRowsDTO = [
    {
        "id": 10,
        "opDate": "2021-08-05T15:19:44.000Z",
        "opResult": "POSITIVE",
        "lock": 0,
        "remarks": "RAS",
        "prescriber": "john018",
        "transUnit": 44,
        "operation": operationsDTO[0],
        "opd": opdDTO
    },
    {
        "id": 8,
        "opDate": "2022-02-05T15:19:44.000Z",
        "opResult": "POSITIVE",
        "lock": 0,
        "remarks": "All is OK",
        "prescriber": "john018",
        "transUnit": 18,
        "operation": operationsDTO[1],
        "admission": admissionDTO
    },
    {
        "id": 14,
        "opDate": "2021-10-05T08:14:44.000Z",
        "opResult": "NEGATIVE",
        "lock": 0,
        "remarks": "Some strange behaviours",
        "prescriber": "john018",
        "transUnit": 12,
        "operation": operationsDTO[3],
        "admission": admissionDTO
    },
]