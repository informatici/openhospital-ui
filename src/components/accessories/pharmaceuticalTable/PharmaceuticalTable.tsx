import { CircularProgress } from '@mui/material';
import InfoBox from 'components/accessories/infoBox/InfoBox';
import Table from 'components/accessories/table/Table';
import { TFilterField } from 'components/accessories/table/filter/types';
import { MedicalDTO } from 'generated';
import { useAppDispatch, useAppSelector } from 'libraries/hooks/redux';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { getMedicalsMov } from 'state/pharmacy';

export default function PharmaceuticalTable() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    state.pharmacy.getMedicalsMov.data ? state.pharmacy.getMedicalsMov.data : []
  );

  const status = useAppSelector((state) => state.pharmacy.getMedicalsMov.status);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.getMedicalsMov.error?.message || t("errors.somethingwrong")
  ) as string;

  const labelData = {
    pharmaceutical: t("pharmacy.stock.pharmaceutical"),
    type: t("pharmacy.stock.type"),
    code: t("pharmacy.stock.code"),
    pcsperpck: t("pharmacy.stock.pcsperpck"),
    stock: t("pharmacy.stock.stock"),
    criticalValue: t("pharmacy.stock.criticalValue"),
    amc: t("pharmacy.stock.amc"),
  };

  const tableHeader = [
    "pharmaceutical",
    "type",
    "code",
    "pcsperpck",
    "stock",
    "criticalValue",
    "amc",
  ];

  const order = ["pcsperpck", "stock", "criticalValue", "amc"];

  const filters: TFilterField[] = [
    { key: "pharmaceutical", label: t("pharmacy.stock.pharmaceutical"), type: "text" },
    { key: "type", label: t("pharmacy.stock.type"), type: "text" },
    { key: "code", label: t("pharmacy.stock.code"), type: "number" },
  ];

  const now = new Date();

  const formatDataToDisplay = (data: MedicalDTO[]) => {
    return data.map((item) => {
      return {
        pharmaceutical: item.description,
        type: item.type?.description,
        code: item.code,
        pcsperpck: item.pcsperpck,
        stock: item.inqty,
        criticalValue: item.minqty,
        amc: item.outqty,
        expDate: item.lot?.dueDate,
      };
    });
  };

  useEffect(() => {
    dispatch(getMedicalsMov());
  }, [dispatch]);

  return (
    <div>
      {(() => {
        switch (status) {
          case "IDLE":
            return <CircularProgress />;
          case "SUCCESS":
            return (
              <Table
                labelData={labelData}
                tableHeader={tableHeader} 
                rowsPerPage={10}
                columnsOrder={order}
                rowClassNames={(row) => "pharmaceutical-table__row"}
                initialOrderBy="pcsperpck"
                rowData={formatDataToDisplay(data)}
                showEmptyCell={false}
                isCollapsabile={false}
                detailColSpan={6}
                filterColumns={filters}
                rowKey="pharmaceutical"
                rawData={(data ?? []).map((item: MedicalDTO) => ({
                  ...item,
                  type: item.type?.description,
                  code: item.code,
                  pharmaceutical: item.description,
                }))}
                manualFilter={false}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          case "FAIL":
            return <InfoBox type="error" message={errorMessage} />;
          default:
            return <CircularProgress />;
        }
      })()}
    </div>
  );
}
