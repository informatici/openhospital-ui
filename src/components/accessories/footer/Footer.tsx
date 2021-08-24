import React, { FunctionComponent } from "react";
import isfLogo from "../../../assets/isf-logo.png";
import "./styles.scss";

const Footer: FunctionComponent = () => {
  return (
    <div className="footer">
      <div className="footer__infoBox">
        <div className="footer__infoBox__row">
          Open Hospital is an ISF's project
        </div>
        <div className="footer__infoBox__row">
          2005 - 2020 ISF © Informatici Senza Frontiere - NGO
        </div>
        <div className="footer__infoBox__row">
          Viale IV Novembre, 100 - 31100 Treviso - Italy
        </div>
        <div className="footer__infoBox__row">C.F. 94106980264</div>
      </div>
      <img src={isfLogo} alt="Open Hospital" />
    </div>
  );
};

export default Footer;
