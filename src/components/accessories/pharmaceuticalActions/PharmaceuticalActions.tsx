import Button from 'components/accessories/button/Button'
import React from 'react'
import "./styles.scss";
import { useTranslation } from 'react-i18next'

export default function PharmaceuticalActions() {
    const { t } = useTranslation();
  return (
    <div>
        <div className="pharmaceuticalActions__buttonSet">
            <div className="buttonSet">
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.exportList")}
                    </Button>
                </div>
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.stockReport")}
                    </Button>
                </div>
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.stockCardReport")}
                    </Button>
                </div>
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.order")}
                    </Button>
                </div>
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.expiring")}
                    </Button>
                </div>
                <div className="action_button">
                    <Button type="button" variant="outlined" color="inherit">
                        {t("pharmacy.stock.amcReport")}
                    </Button>
                </div>
                
                <div className="action_button">
                    <Button type="button" variant="contained" color="primary">
                        {t("pharmacy.stock.addMedecine")}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
