import { ArrowBackIos, Close } from "@material-ui/icons";
import React, { useState } from "react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { IProps } from "./types";

import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

const FormDiscardButton: FunctionComponent<IProps> = ({
    label, showConfirmationDialog = true, confirmationMessage
}) => {
    const { t } = useTranslation();

    const btnLabel: string = (!label || label.length == 0) ? t("common.cancel") : label;
    const dialogMsg: string = (!confirmationMessage || confirmationMessage.length == 0) ? 
        t("common.discardconfirmationmessage") : confirmationMessage;

    const naviagte = useNavigate();
    const [openDiscardConfirmation, setOpenDiscardConfirmation] = useState(false);

    const redirectBack = () => {
        naviagte(-1);
    }

    const handleClick = () => {
        if (showConfirmationDialog) {
            setOpenDiscardConfirmation(true);
        } else {
            redirectBack();
        }
    }

    return (
        <>
            <Button
                type="button"
                variant="outlined"
                disabled={false}
                onClick={handleClick}
            >
                <Close fontSize="small" /> {btnLabel}
            </Button>
            <ConfirmationDialog
                isOpen={openDiscardConfirmation}
                title={btnLabel.toUpperCase()}
                info={dialogMsg}
                icon={warningIcon}
                primaryButtonLabel={btnLabel}
                secondaryButtonLabel={t("common.keepediting")}
                handlePrimaryButtonClick={redirectBack}
                handleSecondaryButtonClick={() => setOpenDiscardConfirmation(false)}
            />
        </>
    );
}

export default FormDiscardButton;