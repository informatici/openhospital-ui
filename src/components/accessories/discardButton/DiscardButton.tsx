import { ChevronLeft } from "@mui/icons-material";
import { useDiscardHelpers } from "libraries/hooks/ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import warningIcon from "../../../assets/warning-icon.png";
import Button from "../button/Button";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import "./styles.scss";
import { IProps } from "./types";

const DiscardButton: FunctionComponent<IProps> = ({ title }) => {
  const { t } = useTranslation();

  const {
    openCancelConfirmation,
    handleCancelConfirmation,
    handleCancelConfirmationDialog,
  } = useDiscardHelpers();

  return (
    <>
      <Button
        dataCy="cancel-form"
        onClick={handleCancelConfirmationDialog(true)}
        type="button"
        variant="text"
        color="primary"
      >
        <ChevronLeft fontSize="small" />
        {title ?? t("common.discard")}
      </Button>
      <ConfirmationDialog
        isOpen={openCancelConfirmation}
        title={t("common.discard")}
        info={t("common.discardMessage")}
        icon={warningIcon}
        primaryButtonLabel={t("common.discard")}
        secondaryButtonLabel={t("common.backToEdit")}
        handlePrimaryButtonClick={handleCancelConfirmation}
        handleSecondaryButtonClick={handleCancelConfirmationDialog(false)}
      />
    </>
  );
};

export default DiscardButton;
