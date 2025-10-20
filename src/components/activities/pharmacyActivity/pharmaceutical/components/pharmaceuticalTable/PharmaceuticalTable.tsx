import { CircularProgress } from '@mui/material';
import InfoBox from 'components/accessories/infoBox/InfoBox';
import Table from 'components/accessories/table/Table';
import { TFilterField } from 'components/accessories/table/filter/types';
import { MedicalDTO } from 'generated';
import { useAppDispatch, useAppSelector } from 'libraries/hooks/redux';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { getMedicals } from 'state/pharmacy';

export default function PharmaceuticalTable() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    state.pharmacy.getMedicals.data ? state.pharmacy.getMedicals.data : []
  );

  const status = useAppSelector((state) => state.pharmacy.getMedicals.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.getMedicals.error?.message || t("errors.somethingwrong")
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

  const formatDataToDisplay = (data: MedicalDTO[]) => {
    return data.map((item) => {
      // Trouver la date d'expiration la plus proche parmi les lots
      let nearestExpiration: string | null = null;
  
      if (item.lots && item.lots.length > 0) {
        const now = new Date();
  
        // Filtrer les lots avec une date future valide
        const futureLots = item.lots.filter(
          (lot) => new Date(lot.dueDate) >= now
        );
  
        if (futureLots.length > 0) {
          // Trouver la plus proche
          const nearestLot = futureLots.reduce((prev, current) => {
            const prevDate = new Date(prev.dueDate);
            const currDate = new Date(current.dueDate);
            return currDate < prevDate ? current : prev;
          });
  
          nearestExpiration = nearestLot.dueDate;
        } else {
          // Si aucun lot futur, on peut choisir le plus récent (déjà expiré)
          const nearestLot = item.lots.reduce((prev, current) => {
            const prevDate = new Date(prev.dueDate);
            const currDate = new Date(current.dueDate);
            return currDate < prevDate ? current : prev;
          });
          nearestExpiration = nearestLot.dueDate;
        }
      }
  
      return {
        pharmaceutical: item.description,
        type: item.type?.description,
        code: item.code,
        pcsperpck: item.pcsperpck,
        stock: item.inqty,
        criticalValue: item.minqty,
        amc: item.outqty,
        lots: item.lots,
        expDate: nearestExpiration,
      };
    });
  };  

  useEffect(() => {
    dispatch(getMedicals());
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
          default :
          return <CircularProgress />;
        }
      })()}
    </div>
  );
}
