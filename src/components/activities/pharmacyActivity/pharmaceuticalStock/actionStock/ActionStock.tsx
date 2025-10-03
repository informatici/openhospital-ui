import Button from "components/accessories/button/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function ActionStock() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="pharmaceuticalStock__buttonSet">
        <div className="buttonSet">
          <div className="export_button">
            <Button type="button" variant="outlined" color="inherit">
              {t("pharmacy.stock.exportList")}
            </Button>
          </div>
          <div className="report_button">
            <Button type="button" variant="outlined" color="inherit">
              {t("pharmacy.stock.stockReport")}
            </Button>
          </div>
        </div>
        <div className="buttonSet">
          <div className="discharge_button">
            <Button type="button" variant="contained" startIcon={<LogoutIcon sx={{ transform: "rotate(90deg)" }} />}>
              {t("pharmacy.stock.discharge")}
            </Button>
          </div>
          <div className="charge_button">
            <Button type="button" variant="contained" startIcon={<ExitToAppIcon sx={{ transform: "rotate(-90deg)" }} />}>
              {t("pharmacy.stock.charge")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
