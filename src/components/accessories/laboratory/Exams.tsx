import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PATHS } from "../../../consts";
import { LaboratoryDTO, LaboratoryDTOStatusEnum } from "../../../generated";
import {
  getFromFields,
  updateFilterFields,
} from "../../../libraries/formDataHandling/functions";
import { useLaboratories } from "../../../libraries/hooks/api/useLaboratories";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { getExams } from "../../../state/exams";
import {
  cancelLab,
  cancelLabReset,
  deleteLab,
  deleteLabReset,
  searchLabs,
  updateLabStatus,
} from "../../../state/laboratories";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import Pagination from "../pagination/Pagination";
import { ChangeLabStatus } from "./ChangeLabStatus";
import { initialFilter, initialFilterFields } from "./consts";
import { EditLaboratoryContent } from "./EditLaboratoryContent";
import { ExamFilterForm } from "./filter/ExamFilterForm";
import { TFilterValues } from "./filter/types";
import "./styles.scss";
import { ExamTable } from "./table/ExamTable";

export const Exams: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState(initialFilter as TFilterValues);
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [deletedObjCode, setDeletedObjCode] = useState("");
  const [canceledObjCode, setCanceledObjCode] = useState("");

  const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
  const [selectedExamRow, setSelectedExamRow] = useState<
    LaboratoryDTO | undefined
  >(undefined);

  const { data, pageInfo, page, handlePageChange } = useLaboratories();

  const fields = useMemo(
    () => updateFilterFields(initialFilterFields, filter, false),
    [filter]
  );
  const labStore = useAppSelector((state: IState) => state.laboratories);
  const handleResetFilter = () => {
    setFilter(initialFilter as TFilterValues);
  };

  useEffect(() => {
    setFilter((previous) => ({ ...previous, page: page }));
  }, [page]);

  useEffect(() => {
    dispatch(
      searchLabs({
        ...getFromFields(fields, "value"),
        page: 0,
        size: 80,
        paged: true,
      })
    );
    dispatch(getExams());

    return () => {
      dispatch(deleteLabReset());
    };
  }, [dispatch, fields]);

  useEffect(() => {
    dispatch(searchLabs({ ...filter, paged: true }));
  }, [dispatch, filter]);

  useEffect(() => {
    const refresh = (
      location.state as { refresh: boolean | undefined } | undefined
    )?.refresh;
    if (refresh) {
      dispatch(searchLabs({ ...filter, paged: true }));
    }
  }, [dispatch, filter, location]);

  const onSubmit = (values: TFilterValues) => {
    setFilter({ ...values, page: 0, size: filter.size });
  };

  const onEdit = (row: LaboratoryDTO) => {
    if (row.status === LaboratoryDTOStatusEnum.Draft) {
      setSelectedExamRow(row);
      setShowStatusChangeModal(true);
    } else {
      navigate(`${PATHS.laboratory}/${row.code}/edit`);
    }
  };

  const onExamStatusChangeClick = () => {
    if (selectedExamRow?.code) {
      dispatch(
        updateLabStatus({
          code: selectedExamRow?.code,
          status: LaboratoryDTOStatusEnum.Open,
        })
      );
    }
  };

  const onExamStatusChangeClose = () => {
    setSelectedExamRow(undefined);
    setShowStatusChangeModal(false);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(code === undefined ? "" : `${code}`);
    dispatch(deleteLab(code));
  };

  const onCancel = (code: number | undefined) => {
    setCanceledObjCode(code === undefined ? "" : `${code}`);
    dispatch(cancelLab(code));
  };
  const onPageChange = (e: any, page: number) => handlePageChange(e, page - 1);

  const errorMessage = useAppSelector((state: IState) =>
    state.laboratories.searchLabs.error?.message
      ? state.laboratories.searchLabs.error?.message
      : t("common.somethingwrong")
  );

  const updateLabErrorMsg = useAppSelector((state: IState) =>
    state.laboratories.updateLab.error?.message
      ? state.laboratories.updateLab.error?.message
      : t("common.somethingwrong")
  );

  let status = useAppSelector(
    (state: IState) => state.laboratories.searchLabs.status
  );

  let changeStatus = useAppSelector(
    (state: IState) => state.laboratories.updateLab.status
  );

  useEffect(() => {
    if (changeStatus === "SUCCESS") {
      dispatch(searchLabs({ ...filter, paged: true }));
    }
  }, [changeStatus, dispatch, filter]);

  /**
   * I commented the following lignes because they were causing issue with filter.
   * They should be removed.
   *
   * useEffect(() => {
   *   dispatch(searchLabs(getFromFields(fields, "value")));
   *   dispatch(getExams());
   * }, []);
   */

  const ExamContent = useMemo(() => {
    return (
      <>
        <div className="lab__header">
          <div className="lab__title">{t("nav.laboratory")}</div>
        </div>
        {status === "LOADING" && (
          <CircularProgress
            style={{ marginLeft: "50%", position: "relative" }}
          />
        )}
        {status !== "LOADING" && (
          <Permission require="exams.read">
            <ExamFilterForm
              onSubmit={onSubmit}
              fields={fields}
              handleResetFilter={handleResetFilter}
            />
            {status === "SUCCESS_EMPTY" && (
              <InfoBox type="info" message={t("common.emptydata")} />
            )}
            {status === "FAIL" && (
              <InfoBox type="error" message={errorMessage} />
            )}
            {changeStatus === "FAIL" && (
              <div ref={infoBoxRef} className="info-box-container">
                <InfoBox type="error" message={updateLabErrorMsg} />
              </div>
            )}
            {status === "SUCCESS" && (
              <>
                <ExamTable
                  data={data ?? []}
                  handleDelete={onDelete}
                  handleCancel={onCancel}
                  handleEdit={onEdit}
                />
                <Pagination
                  page={(pageInfo?.page ?? 0) + 1}
                  count={pageInfo?.totalPages}
                  onChange={onPageChange}
                />
              </>
            )}
            {labStore.deleteLab.status === "LOADING" && (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            )}

            <ConfirmationDialog
              isOpen={labStore.deleteLab.status === "SUCCESS"}
              title={t("lab.deleted")}
              icon={checkIcon}
              info={t("common.deletesuccess", { code: deletedObjCode })}
              primaryButtonLabel={t("common.ok")}
              handlePrimaryButtonClick={() => {
                dispatch(deleteLabReset());
                dispatch(searchLabs({ ...filter, paged: true }));
              }}
              handleSecondaryButtonClick={() => {}}
            />

            <ConfirmationDialog
              isOpen={labStore.cancelLab.status === "SUCCESS"}
              title={t("lab.canceled")}
              icon={checkIcon}
              info={t("lab.cancelsuccess", { code: canceledObjCode })}
              primaryButtonLabel={t("common.ok")}
              handlePrimaryButtonClick={() => {
                dispatch(cancelLabReset());
                dispatch(searchLabs({ ...filter, paged: true }));
              }}
              handleSecondaryButtonClick={() => {}}
            />
          </Permission>
        )}

        {showStatusChangeModal && selectedExamRow && (
          <ChangeLabStatus
            onClick={onExamStatusChangeClick}
            onClose={onExamStatusChangeClose}
            status={LaboratoryDTOStatusEnum.Open}
            isOpen={true}
            labCode={`${selectedExamRow.code}`}
          />
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, fields, data, filter, dispatch, labStore, showStatusChangeModal]);

  return (
    <Fragment>
      <div className="lab_labs">
        <Routes>
          <Route index element={ExamContent} />
          <Route path={`/new`} element={<EditLaboratoryContent />} />
          <Route path={`/:id/edit`} element={<EditLaboratoryContent />} />
        </Routes>
      </div>
    </Fragment>
  );
};
