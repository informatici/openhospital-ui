import { CakeOutlined } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import React from "react";
import { ReactComponent as FemaleIcon } from "../../../assets/gender-female.svg";
import { ReactComponent as MaleIcon } from "../../../assets/gender-male.svg";
import { ReactComponent as TaxIcon } from "../../../assets/tax.svg";
import { PatientDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ProfilePicture } from "../profilePicture/ProfilePicture";

const PatientTeaserItem = (patient: PatientDTO) => {
  // value used to style profile picture
  const profileStyle = {
    height: "50px",
    width: "50px",
    marginBottom: "0px",
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

export default PatientTeaserItem;
