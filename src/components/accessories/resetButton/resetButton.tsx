import { useResetFormHelpers } from "libraries/hooks/ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import warningIcon from "../../../assets/warning-icon.png";
import Button from "../button/Button";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import "./styles.scss";
import { IProps } from "./types";

const ResetButton: FunctionComponent<IProps> = ({
  title,
  formik,
  isLoading,
}) => {
  const { t } = useTranslation();

  const {
    openResetConfirmation,
    handleResetConfirmation,
    handleResetConfirmationDialog,
  } = useResetFormHelpers(formik as any);

  return (
    <>
      <Button
        dataCy="reset-form"
        type="reset"
        variant="text"
        disabled={isLoading || !formik.dirty}
        onClick={handleResetConfirmationDialog(true)}
      >
        {title ?? t("common.reset")}
      </Button>
      <ConfirmationDialog
        isOpen={openResetConfirmation}
        title={t("common.yesReset")}
        info={t("common.resetform")}
        icon={warningIcon}
        primaryButtonLabel={t("common.reset")}
        secondaryButtonLabel={t("common.backToEdit")}
        handlePrimaryButtonClick={handleResetConfirmation}
        handleSecondaryButtonClick={handleResetConfirmationDialog(false)}
      />
    </>
  );
};

export default ResetButton;
