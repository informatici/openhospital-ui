import { debounce, SvgIcon } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import { ProfilePicture } from "../profilePicture/ProfilePicture";

import { useDispatch, useSelector } from "react-redux";
import { TValues } from "../billFilterForm/types";
import { searchPatient } from "../../../state/patients/actions";
import { IState } from "../../../types";
import { PatientDTO } from "../../../generated";
import { CakeOutlined } from "@material-ui/icons";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ReactComponent as MaleIcon } from "../../../assets/gender-male.svg";
import { ReactComponent as FemaleIcon } from "../../../assets/gender-female.svg";
import { ReactComponent as TaxIcon } from "../../../assets/tax.svg";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import { IProps } from "./types";

const PatientAutocomplete: FC<IProps> = ({ onBlur, ...props }) => {
  const [value, setValue] = useState({} as PatientDTO | undefined);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const getOptionSelected = (option: PatientDTO, v: PatientDTO) => {
    return option.code === v.code;
  };
  const patientSearchResults = useSelector<IState, PatientDTO[]>(
    (state) => state.patients.searchResults.data ?? []
  );

  const searchStatus = useSelector<IState>(
    (state) => state.patients.searchResults.status || "IDLE"
  );
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e, value ?? {});
  };

  const onChange = (e: object, val: PatientDTO | null) => {
    setValue(val ?? {});
  };

  useEffect(() => {
    dispatch(
      searchPatient({
        firstName: inputValue,
      } as TValues)
    );
  }, [inputValue]);

  const handleOnInputChange = (event: any, value: string) => {
    if (value === "") setValue({});
    debounce(() => {
      setInputValue(value);
    }, 250);
  };
  // value used to style profile picture
  const profileStyle = {
    height: "50px",
    width: "50px",
  };

  const renderMinimizeTitle = (patient: PatientDTO) => {
    return (
      (patient.sex === "M" ? " ♂ " : " ♀ ") +
      patient.firstName +
      " " +
      patient.secondName +
      " 🧾" +
      patient.taxCode +
      " 🎂 " +
      (patient.birthDate ? renderDate(patient.birthDate) : "")
    );
  };

  const renderOption = (patient: PatientDTO) => {
    return (
      <div className="render_option" title={renderMinimizeTitle(patient)}>
        <ProfilePicture
          style={profileStyle}
          isEditable={false}
          preLoadedPicture={patient?.blobPhoto}
        />
        <div className="info_item">
          <span>
            {patient.sex === "M" ? (
              <SvgIcon className="small_icon">
                <MaleIcon style={{ fontSize: "small" }} />
              </SvgIcon>
            ) : (
              <SvgIcon className="small_icon">
                <FemaleIcon style={{ fontSize: "small" }} />
              </SvgIcon>
            )}
            {patient.firstName + " " + patient.secondName}
          </span>
          <span>
            <SvgIcon className="small_icon">
              <TaxIcon style={{ fontSize: "small" }} />
            </SvgIcon>
            {patient.taxCode}
          </span>
          <span>
            <CakeOutlined className="small_icon" />
            {patient.birthDate ? renderDate(patient.birthDate) : ""}
          </span>
        </div>
      </div>
    );
  };

  const getOptionLabel = (option: PatientDTO | undefined) => {
    return option?.firstName || "";
  };

  return (
    <AutocompleteField
      {...props}
      id="parent_element"
      loading={searchStatus === "LOADING"}
      options={patientSearchResults}
      onInputChange={handleOnInputChange}
      onBlur={handleOnBlur}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      renderOption={renderOption}
      onChange={onChange}
    />
  );
};

export default PatientAutocomplete;
