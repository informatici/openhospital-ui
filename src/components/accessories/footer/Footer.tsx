import React, { FunctionComponent } from "react";
import isfLogo from "../../../assets/isf-logo.png";
import "./styles.scss";

const Footer: FunctionComponent = () => {
  return (
    <div className="footer">
      <div className="footer__infoBox">
        <div className="footer__infoBox__row">
          <strong>Open Hospital is an ISF's project</strong>
        </div>
        <div className="footer__infoBox__row">
          2005 - {new Date().getFullYear()} ISF © Informatici Senza Frontiere -
          APS
        </div>
        <div className="footer__infoBox__row">
          Viale IV Novembre, 70/E - 31100 Treviso - Italy
        </div>
        <div className="footer__infoBox__row">
          C.F. 94106980264 - P.IVA 05182520261
        </div>
        <div className="footer__infoBox__row"></div>
      </div>
      <a
        href={"https://www.informaticisenzafrontiere.org/"}
        title="Informatici Senza Frontiere"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={isfLogo}
          className="ISF__logo"
          alt="Informatici Senza Frontiere"
        />
      </a>
    </div>
  );
};

export default Footer;
