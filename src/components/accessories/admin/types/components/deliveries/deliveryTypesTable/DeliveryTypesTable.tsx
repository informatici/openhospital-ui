import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../../../../assets/check-icon.png";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import { scrollToElement } from "../../../../../../../libraries/uiUtils/scrollToElement";
import { deleteDeliveryTypeReset } from "../../../../../../../state/types/deliveries";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import Table from "../../../../../table/Table";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const DeliveryTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("deliveryTypes.code"),
    description: t("deliveryTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useAppSelector(
    (state) => state.types.deliveries.getAll
  );

  const deleteDeliveryType = useAppSelector(
    (state) => state.types.deliveries.delete
  );

  const handleEdit = (row: DeliveryTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: DeliveryTypeDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteDeliveryType.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteDeliveryType.status]);

  const formatDataToDisplay = (data: DeliveryTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="deliveryTypesTable">
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              <div className="fullWidth">
                <InfoBox
                  type="error"
                  message={error?.error || error?.message}
                />
              </div>
            );
          case "LOADING":
            return <CircularProgress className="loader" />;

          case "SUCCESS":
            return (
              <>
                {deleteDeliveryType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteDeliveryType.error?.message}
                    />
                  </div>
                )}
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  isCollapsabile={false}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showEmptyCell={false}
                  rawData={data}
                  manualFilter={false}
                  rowKey="code"
                  headerActions={headerActions}
                />
                <ConfirmationDialog
                  isOpen={!!deleteDeliveryType.hasSucceeded}
                  title={t("deliveryTypes.deleted")}
                  icon={checkIcon}
                  info={t("deliveryTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteDeliveryTypeReset());
                  }}
                  handleSecondaryButtonClick={() => ({})}
                />
              </>
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return;
        }
      })()}
    </div>
  );
};

export default DeliveryTypesTable;
