import Button from "@material-ui/core/Button";
import SplitButton from "../../accessories/splitButton/SplitButton";
import { useFormik } from "formik";
import { Redirect } from "react-router";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { object } from "yup";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import  'ag-grid-community/dist/ag-grid-community';
import SearchIcon from "../../../assets/SearchIcon";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  getMedicals,
} from "../../../state/medicals/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import IconButton from "../../accessories/iconButton/IconButton";
import TextField from "../../accessories/textField/TextField";
import "./styles.scss";
import { IDispatchProps, IStateProps, TValues, TProps, TActivityTransitionState } from "./types";
import { useIsSearchByCode } from "./useIsSearchByCode";
import isEmpty from "lodash.isempty";
import iconDelete from "@material-ui/icons/DeleteOutlined"
import iconEdit from "@material-ui/icons/EditOutlined"
import { GetMedicalsUsingGETSortByEnum } from "../../../generated";

const MedicalsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  getMedicals,
  medicalSearchResults,
  searchStatus,
}) => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.pharmaceuticals")]: "/Medicals",
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const initialValues: TValues = {
    code: "",
    prod_code: "",
    type: "",
    description: "",
    initialqty: "",
    pcsperpck: "",
    inqty: "",
    outqty: "",
    minqty: "",
  };

  const validationSchema = object({
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: TValues) => {
      scrollToElement(resultsRef.current);
      // getMedicals(values);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  const reportTypes =[
    "Report of stock",
    "Report of order",
    "Report of stock card"
    ];

  useEffect(() => {
    if(searchStatus === 'IDLE' && isEmpty(medicalSearchResults))
       getMedicals(GetMedicalsUsingGETSortByEnum.NONE);

      renderSearchResults();
  }, [searchStatus]);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const autoSizeAll = (skipHeader: boolean) => {
    var allColumnIds: any = [];
    console.log('gridColumnApi: ', gridColumnApi);
    gridColumnApi?.getAllColumns().forEach(function (column: any) {
      allColumnIds.push(column.colId);
    });
    gridColumnApi?.autoSizeColumns(allColumnIds, skipHeader);
  };

  const renderSearchResults = (): JSX.Element | undefined => {
    switch (searchStatus) {
      case "IDLE":
        return;

      case "LOADING":
        return (
          <h3 className="medicals__loading">{t("common.searching")}</h3>
        );

      case "SUCCESS":
        return (
          // <!-- USARE MATERIAL UI GRID? -->
          <div className="medicalsGrid_main">
            <AgGridReact onGridReady={onGridReady} onFirstDataRendered={() => autoSizeAll(false)} defaultColDef={{ resizable: true }} rowData={medicalSearchResults} rowHeight={40} pagination={true} paginationAutoPageSize={true} 
            frameworkComponents={{
            iconEditRenderer: (params: any) => IconButton({ url: '/editMedical/' + params.data.code, svgImage: iconEdit}),
            iconDeleteRenderer: (params: any) => IconButton({url: "deleteMedical/" + params.data.code, svgImage:  iconDelete }),
          }}>
              <AgGridColumn headerName="Type" field="type.description"></AgGridColumn>
              <AgGridColumn headerName="Code" field="prod_code"></AgGridColumn>
              <AgGridColumn headerName="Description" field="description" sortable={true} filter={true}></AgGridColumn>
              <AgGridColumn headerName="PcsXPck" field="pcsperpck" maxWidth={100}></AgGridColumn>
              <AgGridColumn headerName="Stock" field="{{inqty - outqty}}" maxWidth={100}></AgGridColumn>
              <AgGridColumn headerName="Crit. Level" field="{{(inqty - outqty) <= minqty}}" maxWidth={100}></AgGridColumn>
              <AgGridColumn headerName="Out of Stock" field="{{(inqty - outqty) == 0}}"  checkboxSelection={true}></AgGridColumn>
              <AgGridColumn headerName="Crit. Level" field="{{(inqty - outqty) <= minqty}}" maxWidth={100}></AgGridColumn>
              <AgGridColumn headerName="Edit" cellRenderer="iconEditRenderer" maxWidth={100}></AgGridColumn>
              <AgGridColumn headerName="Delete" cellRenderer="iconDeleteRenderer" maxWidth={100}></AgGridColumn>
            </AgGridReact> 
          </div>
        );

      case "SUCCESS_EMPTY":
        return <InfoBox type="warning" message={t("common.searchnotfound")} />;

      default:
        return <InfoBox type="error" message={t("common.somethingwrong")} />;
    }
  }

  const [activityTransitionState, setActivityTransitionState] =
  useState<TActivityTransitionState>("IDLE");
  
  const useDescription = (
    event: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) => {  
      switch(index)
      {
        case 0: //Report of stock
          //will call a component
        break;
        case 1: //Report of order
          //will call a component
        break;
        case 2: //Report of stock card
          //will call a component
        break;
        default: //No valid choice
          return;
      }
  }

  switch (activityTransitionState) {
    case "TO_NEW_MEDICAL":
      return <Redirect to={`/newMedical/`} />; 
      case "TO_EDIT_MEDICAL":
        return <Redirect to={`/editMedical/`} />; 
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
              {/* <Button
                className="medicals__button"
                type="submit"
                disabled={searchStatus === "LOADING"}
              >
                <div className="medicals__button__label">
                  {t("common.report")}
                </div>
              </Button> */}
              <Button
                className="medicals__button"
                type="submit"
                disabled={searchStatus === "LOADING"}
              >
                <div className="medicals__button__label">
                  {t("common.export")}
                </div>
              </Button>
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
          <form className="medicals__panel" onSubmit={formik.handleSubmit}>
            <div className="medicals__primary">
              <div className="row left-xs">
                <div className="medicals__formItem">
                  
                  <TextField
                    theme="regular"
                    field={formik.getFieldProps("id")}
                    label={t("common.search")}
                    isValid={isValid("id")}
                    errorText={getErrorText("id")}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              
            </div>
            {renderSearchResults()}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );

  }

};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  searchStatus: state.medicals.getMedicals.status || "IDLE",
  medicalSearchResults: state.medicals.getMedicals.data,
});

const mapDispatchToProps: IDispatchProps = {
  getMedicals,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicalsActivity);
