import React, { FunctionComponent } from "react";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { TProps } from "./types";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const BillingActivity: FunctionComponent<TProps> = ({
    userCredentials
}) => {
    const { t } = useTranslation();

    const history = useHistory();

    const breadcrumbMap = {
        [t("nav.dashboard")]: "/",
        [t("nav.billing")]: "/bill",
    };

    return (
        <div className="billing">
            <AppHeader
                userCredentials={userCredentials}
                breadcrumbMap={breadcrumbMap}
            />
            <div className="billing__background">
                <div className="container">
                    <div className="billing__title">{t("nav.billing")}</div>
                    <form className="billing__panel">
                        <h3>{t("nav.bill_chose")}</h3>
                        <div className="bill_buttons__Container">
                            <Button className="new_bill__button" variant="outlined" size="large" onClick={() => history.push("/bills")}>
                                {t("nav.newbill")}
                            </Button>
                            <Button className="search_bill__button" variant="outlined" size="large">
                                {t("nav.searchbill")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default BillingActivity;