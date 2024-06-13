import React, { ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse } from "../../../../../../../state/types";
import { IState } from "../../../../../../../types";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import InfoBox from "../../../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import Table from "../../../../../table/Table";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import { deleteDeliveryTypeReset } from "../../../../../../../state/types/deliveries/actions";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const DeliveryTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("deliveryTypes.code"),
    description: t("deliveryTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<DeliveryTypeDTO[]>
  >((state) => state.types.deliveries.getAll);

  const deleteDeliveryType = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.types.deliveries.delete
  );

  const handleEdit = (row: DeliveryTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: DeliveryTypeDTO) => {
    onDelete(row);
  };

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
                {deleteDeliveryType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteDeliveryType.error?.message}
                    />
                  </div>
                )}
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
