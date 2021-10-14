import billDTO from "./billDTO"
import billItemDTO from "./billItemDTO"
import billPaymentsDTO from "./billPaymentsDTO"

const fullBillDTO = {
    bill: billDTO,
    billItems: Array(billItemDTO),
    billPayments: Array(billPaymentsDTO),
}

export default fullBillDTO;