import Button from "components/accessories/button/Button";
import React from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { Link } from "@mui/material";
import { PATHS } from "consts";

export default function PharmaceuticalActions() {
  const { t } = useTranslation();
  return (
    <div className="buttonSet">
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.exportList")}
      </Button>
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.stockReport")}
      </Button>
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.stockCardReport")}
      </Button>
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.order")}
      </Button>
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.expiring")}
      </Button>
      <Button type="button" variant="outlined" color="inherit">
        {t("pharmacy.stock.amcReport")}
      </Button>
      <Link href={PATHS.pharmacy_pharmaceutical_new}>
        <Button type="button" variant="contained" color="primary">
          {t("pharmacy.stock.addMedecine")}
        </Button>
      </Link>
    </div>
  );
}
