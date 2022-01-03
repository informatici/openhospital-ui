const billPaymentsDTO = {
    id: 0,
    billId: 10,
    date: new Date().toISOString(),
    amount: 500,
    user: "admin"
}

export const billPaymentsDTOs = [
    {
        id: 10,
        billId: 10,
        date: new Date().toISOString(),
        amount: 1000,
        user: "admin"
    },
    {
        id: 4,
        billId: 10,
        date: new Date().toISOString(),
        amount: 500,
        user: "admin"
    },
    {
        id: 5,
        billId: 10,
        date: new Date().toISOString(),
        amount: 1000,
        user: "admin"
    },
    {
        "id": 8,
        "billId": 5,
        "date": new Date().toISOString(),
        "amount": 500,
        "user": "admin"
    }

]

export default billPaymentsDTO;