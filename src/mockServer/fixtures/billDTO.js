import patientDTO from "./patientDTO";

export const billDTO = {
    id: 1,
    list: true,
    listId: 0,
    patient: patientDTO,
    date: "1627831184000",
    update: "1627831184000",
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "C",
    amount: 1000,
    balance: 1500,
    user: "admin"
};

export const billDTO1 = {
    id: 5,
    list: true,
    listId: 0,
    patient: patientDTO,
    date: "1627831184014",
    update: "1627831184020",
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "C",
    amount: 5000,
    balance: 1000,
    user: "admin"
};

export const pendingBillDTO = {
    id: 3,
    list: true,
    listId: 0,
    patient: patientDTO,
    date: "1627831184000",
    update: "1627831184000",
    listName: "Basic",
    patientTrue: true,
    patName: "Antonio Carlos",
    status: "O",
    amount: 1000,
    balance: 1500,
    user: "admin"
};