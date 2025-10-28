import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "components/accessories/button/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./styles.scss";

export function StockActions() {
  const { t } = useTranslation();

  return (
    <div className="pharmaceuticalStock__actions">
      <Button
        className="export_button"
        type="button"
        variant="outlined"
        color="inherit"
      >
        {t("pharmacy.stock.exportList")}
      </Button>
      <Button
        className="report_button"
        type="button"
        variant="outlined"
        color="inherit"
      >
        {t("pharmacy.stock.stockReport")}
      </Button>
      <div className="separator"></div>
      <Link to={"./discharge-movement"}>
      <Button
        type="button"
        variant="contained"
        className="discharge_button"
        startIcon={<LogoutIcon sx={{ transform: "rotate(90deg)" }} />}
      >
        {t("pharmacy.stock.discharge")}
      </Button>
      </Link>
      <Link to={"./charge-movement"}>
        <Button
          className="charge_button"
          type="button"
          variant="contained"
          startIcon={<ExitToAppIcon sx={{ transform: "rotate(-90deg)" }} />}
        >
          {t("pharmacy.stock.charge")}
        </Button>
      </Link>
    </div>
  );
}
