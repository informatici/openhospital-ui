import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { useFormik } from "formik";
import isEmpty from "lodash.isempty";
import { Button } from "@material-ui/core";
import iconDelete from "@material-ui/icons/DeleteOutlined";
import iconEdit from "@material-ui/icons/EditOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { IState } from "../../../types";
import { GetMedicalsUsingGETSortByEnum, MedicalDTO } from "../../../generated";
import "./styles.scss";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { medicalTypesFormatter } from "../../../libraries/formatUtils/optionFormatting";
import { deleteMedical, getMedicals, filterMedicals } from "../../../state/medicals/actions";
import { getMedicalTypes } from "../../../state/medicaltypes/actions";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import TextField from "../../accessories/textField/TextField";
import SelectField from "../../accessories/selectField/SelectField";
import { CsvDownloadDTO } from "../../../generated/models/CsvDownloadDTO";
import IconButton from "../../accessories/iconButton/IconButton"
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import SplitButton from "../../accessories/splitButton/SplitButton";
import warningIcon from "../../../assets/warning-icon.png";
import { IDispatchProps, IStateProps, TProps, TActivityTransitionState, TValues } from "./types";

const MedicalsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  getMedicals,
  getMedicalTypes,
  medicalSearchResults,
  searchStatus,
  medicalTypeResults,
  medicalTypeStatus,
  medicalTypesOptions,  
  deleteMedical,  
  deleteStatus,
  isDeleted
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.pharmaceuticals")]: "/Medicals",
  };

  const infoBoxRef = useRef<HTMLDivElement>(null);

  const initialValues : TValues = {critical: undefined, desc: undefined, nameSorted: undefined, type: undefined  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      filterMedicals(values.critical, values.desc, values.nameSorted, values.type);
    },
  });

  const reportTypes = [
    t("medical.stockreport"),
    t("medical.orderreport"),
    t("medical.cardreport"),
  ];

  const searchValue = (value: MedicalDTO[] | undefined): any[] => {
    var filterDesc = formik.getFieldProps("id").value ? formik.getFieldProps("id").value.toLowerCase() : '';
    var filterType = formik.getFieldProps("type").value ? formik.getFieldProps("type").value : '';
    let result = Array<MedicalDTO>();
    if(value)
      result = value?.filter((element) => {
        return element.description?.toLowerCase().includes(filterDesc) &&
          element.type?.description?.includes(filterType)
      })
    return result;
  };

  let selectedType: string;

  const onBlurSelect = (e: React.FocusEvent<any>): void => {
    switch (e.target.value) {
      case "L":
        selectedType = t("medicaltype.laboratory");
        formik.setFieldValue("type", selectedType);
        break;
      case "S":
        selectedType = t("medicaltype.surgery");
        formik.setFieldValue("type", selectedType);
        break;
      case "D":
        selectedType = t("medicaltype.drugs");
        formik.setFieldValue("type", selectedType);
        break;
      case "K":
        selectedType = t("medicaltype.chemical");
        formik.setFieldValue("type", selectedType);
        break;
        case "":
        default:
          selectedType = t("medicaltype.all");
          formik.setFieldValue("type", "");
        break;
    }
  };

  const [options, setOptions] = useState(medicalTypesOptions);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =  useState<TActivityTransitionState>("IDLE");
  const [medicalToDelete, setMedicalToDelete] = useState(-1);  
  const [page, setPage] = React.useState(0);  
  const [pagedRows, setPagedRows] = React.useState(10);

  useEffect(() => {
    if (searchStatus === "IDLE" && isEmpty(medicalSearchResults))
      getMedicals(GetMedicalsUsingGETSortByEnum.NONE);

    if (medicalTypeStatus === "IDLE" && isEmpty(medicalTypeResults))
      getMedicalTypes({});

    renderSearchResults();
    renderMedicalTypesResults();
  }, [searchStatus, medicalTypeStatus]);

  useEffect(() => {
    getMedicals(GetMedicalsUsingGETSortByEnum.NONE);
    renderSearchResults();
  }, [isDeleted]);

  useEffect(() => {
    if (isDeleted) {
      scrollToElement(infoBoxRef.current);
    }
  }, [isDeleted]);

  const handleDelete = (code: number) => {
    deleteMedical(code);
    setOpenDeleteConfirmation(false);
  };

  const handleOpenDeleteConfirmation = (code: number) => {
    setMedicalToDelete(code);
    setOpenDeleteConfirmation(true);
  };

  const renderDeleteMedical = (code: number): JSX.Element | undefined => {
    switch (deleteStatus) {
      case "IDLE":
      case "LOADING":
        return;
      case "SUCCESS":
        if(medicalToDelete > 0)
          return (<InfoBox type="warning" message={t("common.deletesuccess", { code: `${medicalToDelete}`})} />);
        else return;
      case "FAIL":
        return (<InfoBox type="error" message={t("common.somethingwrong")} />);
    }
  };

  const renderMedicalTypesResults = (): void => {
    switch (medicalTypeStatus) {
      case "IDLE":
      case "LOADING":
        return;
      case "SUCCESS":
        medicalTypesOptions.push({ value: "", label: t("medicaltype.all")});
        medicalTypesOptions = [...medicalTypesOptions, ...medicalTypesFormatter(medicalTypeResults)] ;
        setOptions(medicalTypesOptions);
    }
  };

  const renderSearchResults = (): JSX.Element | undefined => {
    switch (searchStatus) {
      case "IDLE":
        return;

      case "LOADING":
        return <h3 className="medicals__loading">{t("common.searching")}</h3>;

      case "SUCCESS":
        return (
          <div className="medicalsGrid_main">
            <Paper>
              <TableContainer>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">PcsXPck</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="right">Crit. Level</TableCell>
                      <TableCell align="right">Out of Stock</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchValue(medicalSearchResults)?.slice(page * pagedRows, page * pagedRows + pagedRows)
                      .map((row) => (
                      <TableRow key={row?.code}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="center">{row?.type.description}</TableCell>
                        <TableCell align="right">{row?.prod_code}</TableCell>
                        <TableCell align="right">{row?.description}</TableCell>
                        <TableCell align="right">{row?.pcsperpck}</TableCell>
                        <TableCell align="right">{row.inqty - row.outqty}</TableCell>
                        <TableCell align="right">{row.inqty - row.outqty <= row.minqty}</TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={ row.inqty - row.outqty === 0}
                            inputProps={{ "aria-label": "Out of Stock" }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            svgImage={iconEdit}
                            url={"/editMedical/" + row.code}
                          ></IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            svgImage={iconDelete}
                            onClick={() =>
                              handleOpenDeleteConfirmation(
                                row.code ? row.code : 0
                              )
                            }
                          ></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                  </TableFooter>
                </Table>
              </TableContainer>
              {searchValue(medicalSearchResults)?.length > pagedRows ? (
                <TablePagination
                  component="div"
                  count={searchValue(medicalSearchResults)?.length | 0}
                  rowsPerPage={pagedRows}
                  rowsPerPageOptions={[10, 25, 100]}
                  onChangePage={(event: unknown, newPage: number) => setPage(newPage)}
                  page={page}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />) : ("") 
              }
            </Paper>
          </div>
        );

      case "SUCCESS_EMPTY":
        return <InfoBox type="warning" message={t("common.searchnotfound")} />;

      default:
        return <InfoBox type="error" message={t("common.somethingwrong")} />;
    }
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPagedRows(parseInt(event.target.value));
    setPage(0);
  };

  //method to prepare .csv export
  const csvDownload = (props: MedicalDTO[] | undefined): any => {
    if (props) {
      let obj: CsvDownloadDTO = {};
      let dataDownload: CsvDownloadDTO[] = [];
      props.forEach((e: MedicalDTO) => {
        obj = {
          "ID": e.code ? e.code : 0,
          "Type": e.type?.description,
          "Code": e.prod_code ? e.prod_code : "",
          "Description": e.description ? e.description : "",
          "PcsXPck": e.pcsperpck ? e.pcsperpck : 0,
          "Stock": e.inqty && e.outqty ? (e.inqty - e.outqty) : 0,
          "Crit_Level": e.inqty && e.outqty && e.minqty ?  ((e.inqty - e.outqty) <= e.minqty) ? "Yes" : "No" : "",
          "Out_Of_Stock": e.inqty && e.outqty ? (e.inqty - e.outqty) === 0 ? "Yes" : "No" : ""
        }
        dataDownload.push(obj);
      })
      return dataDownload
    }
  };
  
  const useDescription = (
    event: React.MouseEvent<Element, MouseEvent>,
    index: number
  ) => {
    switch (index) {
      case 0: //Report of stock
        //TO DO - will call a component
        break;
      case 1: //Report of order
        //TO DO - will call a component
        break;
      case 2: //Report of stock card
        //TO DO - will call a component
        break;
      default:
        //TO DO - No valid choice
        return;
    }
  };

  switch (activityTransitionState) {
    case "TO_NEW_MEDICAL":
      if (!history.location.pathname.includes("newMedical"))
        history.push("/newMedical/");
    default:
      return (
        <div className="medicals">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="medicals__background">
            <div className="container">
              <div className="headContainer">
                <div className="medicals__title">
                  {t("nav.pharmaceuticals")}
                </div>
                <div className="medicals_buttonset">
                  <SplitButton
                    disabled={searchStatus === "LOADING"}
                    type="button"
                    descriptions={reportTypes}
                    label={t("common.report")}
                    onClick={useDescription}
                    className="medicals__button medicals__button__label"
                  >
                    <div className="medicals__button__label">
                      {t("common.report")}
                    </div>
                  </SplitButton>
                  <CSVLink
                    className="medicals__export__button"
                    filename={"Pharmaceuticals_list.csv"}
                    data={csvDownload(searchValue(medicalSearchResults))}
                  >
                    <Button
                      className="medicals__button"
                      disabled={searchStatus === "LOADING"}
                    >
                      <div className="medicals__button__label">
                        {t("common.export")}
                      </div>
                    </Button>
                  </CSVLink>
                  <Button
                    className="medicals__button"
                    type="submit"
                    disabled={searchStatus === "LOADING"}
                    onClick={() => setActivityTransitionState("TO_NEW_MEDICAL")}
                  >
                    <div className="medicals__button__label">
                      {t("common.new")}
                    </div>
                  </Button>
                </div>
              </div>
              {/* Search bar */}
              <form className="medicals__panel" onSubmit={formik.handleSubmit}>
                <div className="medicals__primary">
                  <div className="row left-xs">
                    <div className="medicals__formItem fast__search">
                      <SelectField
                        fieldName={"type"}
                        fieldValue={"type"}
                        label={t("medicaltype.select")}
                        isValid={true}
                        errorText={""}
                        onBlur={onBlurSelect}
                        options={options || []}
                      />
                      <TextField
                        theme="regular"
                        field={formik.getFieldProps("id")}
                        label={t("common.search")}
                        isValid={true}
                        errorText={""}
                        onBlur={formik.handleBlur}
                      />
                      <div className="search__button">
                        <Button type="submit">
                          <SearchIcon fontSize="large" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {renderSearchResults()}
              </form>
            </div>
          </div>          
          <div ref={infoBoxRef}>
            {renderDeleteMedical(medicalToDelete)}
          </div>
          <ConfirmationDialog
            isOpen={openDeleteConfirmation}
            title={t("common.delete")}
            info={t("common.deleteconfirmation", {
              code: `${medicalToDelete}`,
            })}
            icon={warningIcon}
            primaryButtonLabel="OK"
            secondaryButtonLabel="Dismiss"
            handlePrimaryButtonClick={() => handleDelete(medicalToDelete)}
            handleSecondaryButtonClick={() => setOpenDeleteConfirmation(false)}
          />
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  searchStatus: state.medicals.getMedicals.status || "IDLE",
  medicalSearchResults: state.medicals.getMedicals.data,
  medicalTypeStatus: state.medicaltypes.getMedicalType.status || "IDLE",
  medicalTypeResults: state.medicaltypes.getMedicalType.data,
  medicalTypesOptions: [],
  deleteStatus: state.medicals.deleteMedical.status || "IDLE",
  isDeleted: state.medicals.deleteMedical.status === "SUCCESS",
});

const mapDispatchToProps: IDispatchProps = {
  getMedicals,
  getMedicalTypes, 
  deleteMedical,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalsActivity);

