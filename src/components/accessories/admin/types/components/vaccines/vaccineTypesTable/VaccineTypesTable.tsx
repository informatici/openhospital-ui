import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "@/libraries/hooks/redux";
import { ApiResponse } from "../../../../../../../state/types";
import { IState } from "../../../../../../../types";
import { VaccineTypeDTO } from "../../../../../../../generated";
import InfoBox from "../../../../../infoBox/InfoBox";
import { CircularProgress } from "@mui/material";
import Table from "../../../../../table/Table";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import { deleteVaccineTypeReset } from "../../../../../../../state/types/vaccines";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";
import { scrollToElement } from "../../../../../../../libraries/uiUtils/scrollToElement";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const VaccineTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("vaccineTypes.code"),
    description: t("vaccineTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<VaccineTypeDTO[]>
  >((state) => state.types.vaccines.getVaccineTypes);

  const deleteVaccineType = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.types.vaccines.delete
  );

  const handleEdit = (row: VaccineTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: VaccineTypeDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteVaccineType.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteVaccineType.status]);

  const formatDataToDisplay = (data: VaccineTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="vaccineTypesTable">
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
                {deleteVaccineType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteVaccineType.error?.message}
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
                  isOpen={!!deleteVaccineType.hasSucceeded}
                  title={t("vaccineTypes.deleted")}
                  icon={checkIcon}
                  info={t("vaccineTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteVaccineTypeReset());
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

export default VaccineTypesTable;
