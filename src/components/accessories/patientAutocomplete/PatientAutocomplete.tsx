import { debounce } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchPatient } from "../../../state/patients/actions";
import { IState } from "../../../types";
import { PatientDTO } from "../../../generated";

import AutocompleteField from "../autocompleteField/AutocompleteField";
import { IProps, TValues } from "./types";
import PatientTeaserItem from "./PatientTeaserItem";

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
    onBlur(e, value ?? undefined);
  };

  const onChange = (e: object, val: PatientDTO | null) => {
    setValue(val ?? undefined);
  };

  useEffect(() => {
    dispatch(
      searchPatient({
        firstName: inputValue,
      } as TValues)
    );
  }, [inputValue]);

  const handleOnInputChange = (event: any, value: string) => {
    if (value === "") setValue(undefined);
    debounce(() => {
      setInputValue(value);
    }, 250);
  };

  const getOptionLabel = (option: PatientDTO | undefined) => {
    return option?.firstName ?? "";
  };

  const optionsComparator = (patient: PatientDTO, val: string | number) => {
    return patient.code === +val;
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
      renderOption={PatientTeaserItem}
      onChange={onChange}
      optionsComparator={optionsComparator}
    />
  );
};

export default PatientAutocomplete;
