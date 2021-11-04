import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO, PatientDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import RenderBillDetails from "../billTable/RenderBillDetails";
import Table from "../table/Table";

const BillRecords = () => {
  const { t } = useTranslation();
  const pendingHeader = ["date", "amount", "balance"];
  const pendingLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
    balance: t("bill.balance"),
  };
  const identifierColumn = "billDTO";
  const closedHeader = ["date", "amount"];
  const closedLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
  };

  const order = ["date", "balance"];
  const dispatch = useDispatch();
  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    if (patient && patient.code) {
      dispatch(getPendingBills(patient.code));
      dispatch(
        searchBills({
          fromDate: "",
          toDate: "",
          patientCode: patient.code,
        })
      );
    }
  }, [patient, dispatch]);

  const pendingBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.getPendingBills.data ?? [];
  });

  const formatDataToDisplay = (data: FullBillDTO[]) => {
    return data.map((item) => {
      return {
        billDTO: item.billDTO,
        date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
        amount: currencyFormat(item.billDTO?.amount),
        balance: currencyFormat(item.billDTO?.balance),
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };

  const getCoreRow = (row: any) => {
    return {
      fullBill: pendingBills?.find(
        (item) => item["billDTO"] === row["billDTO"]
      ),
    };
  };
  const closedBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  return (
    <div className="patientBillRecords">
      <h3>{`${t("bill.pending")} (${pendingBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(pendingBills)}
        tableHeader={pendingHeader}
        labelData={pendingLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        renderItemDetails={RenderBillDetails}
        getCoreRow={getCoreRow}
      />
      <h3>{`${t("bill.closed")} (${closedBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(closedBills)}
        tableHeader={closedHeader}
        labelData={closedLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        getCoreRow={getCoreRow}
      />
    </div>
  );
};

export default BillRecords;
