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
          2005 - {new Date().getFullYear()} ISF © Informatici Senza Frontiere -
          NGO
        </div>
        <div className="footer__infoBox__row">
          Viale IV Novembre, 100 - 31100 Treviso - Italy
        </div>
        <div className="footer__infoBox__row">C.F. 94106980264</div>
      </div>
      <a
        href={"https://www.informaticisenzafrontiere.org/"}
        title="Informatici Senza Frontiere"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={isfLogo} alt="Informatici Senza Frontiere" />
      </a>
    </div>
  );
};

export default Footer;
