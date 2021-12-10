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

export const billResults = [
    {
        id: 10,
        list: true,
        listId: 0,
        patientDTO: patientDTO,
        date: moment().toISOString(),
        update: moment().toISOString(),
        listName: "Basic",
        patientTrue: true,
        patName: "Antonio Carlos",
        status: "O",
        amount: 604,
        balance: 0,
        user: "admin"
    },
    {
        id: 3,
        list: true,
        listId: 0,
        patientDTO: patientDTO,
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
        listId: 3,
        patientDTO: patientDTO2,
        date: moment().toISOString(),
        update: moment().toISOString(),
        listName: "Basic",
        patientTrue: true,
        patName: "Cedimo Andrea",
        status: "C",
        amount: 5000,
        balance: 0,
        user: "admin"
    },
    {
        id: 12,
        list: true,
        listId: 2,
        patientDTO: patientDTO,
        date: moment().add(-6, 'days').toISOString(),
        update: moment().add(-6, 'days').toISOString(),
        listName: "Basic",
        patientTrue: true,
        patName: "Antonio Carlos",
        status: "O",
        amount: 1500,
        balance: 1500,
        user: "admin"
    },
    {
        id: 14,
        list: true,
        listId: 2,
        patientDTO: patientDTO,
        date: new Date().toISOString(),
        update: new Date().toISOString(),
        listName: "Basic",
        patientTrue: true,
        patName: "Antonio Carlos",
        status: "O",
        amount: 850,
        balance: 150,
        user: "admin"
    }
];

