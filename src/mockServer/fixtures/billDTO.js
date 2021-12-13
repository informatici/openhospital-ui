import moment from "moment";
import patientDTO, { patientDTO2 } from "./patientDTO";

export const billDTO = {
    id: 1,
    list: true,
    listId: 0,
    patientDTO: patientDTO,
    date: moment().toISOString(),
    update: moment().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "C",
    amount: 2000,
    balance: 0,
    user: "admin"
};

export const billResults = [{
    id: 5,
    list: true,
    listId: 0,
    patientDTO: patientDTO,
    date: moment().toISOString(),
    update: moment().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "C",
    amount: 1000,
    balance: 0,
    user: "admin"
},
{
    id: 3,
    list: true,
    listId: 0,
    patientDTO: patientDTO2,
    date: moment().toISOString(),
    update: moment().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Cedimo Andrea",
    status: "O",
    amount: 2000,
    balance: 1500,
    user: "admin"
},
{
    id: 36,
    list: true,
    listId: 0,
    patientDTO: patientDTO2,
    date: moment().add(-300, 'days').toISOString(),
    update: moment().day(-300).toDate().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Cedimo Andrea",
    status: "O",
    amount: 5000,
    balance: 2000,
    user: "admin"
},
{
    id: 10,
    list: true,
    listId: 0,
    patientDTO: patientDTO,
    date: moment().add(-100, 'days').toISOString(),
    update: moment().day(-100).toDate().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "O",
    amount: 1500,
    balance: 1500,
    user: "admin"
},
{
    id: 10,
    list: true,
    listId: 0,
    patientDTO: patientDTO,
    date: moment().day(-40).toDate().toISOString(),
    update: moment().day(-40).toDate().toISOString(),
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "O",
    amount: 850,
    balance: 150,
    user: "admin"
}
];

