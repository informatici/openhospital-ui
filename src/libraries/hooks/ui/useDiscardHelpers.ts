import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlocker, useNavigate } from "react-router";

export function useDiscardHelpers() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isBlocking, setIsBlocking] = useState(false);
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const handleCancelConfirmationDialog = useCallback(
    (value: boolean) => () => {
      setOpenCancelConfirmation(value);
      if (isBlocking && !value) {
        setIsBlocking(false);
        blocker.reset?.();
      }
    },
    [setOpenCancelConfirmation]
  );

  const blocker = useBlocker(function () {
    if (openCancelConfirmation) {
      return false;
    }
    setIsBlocking(true);
    setOpenCancelConfirmation(true);
    return true;
  });

  const handleCancelConfirmation = useCallback(() => {
    if (isBlocking) {
      blocker.proceed?.();
      setIsBlocking(false);
    } else {
      navigate(-1);
    }
    setOpenCancelConfirmation(false);
  }, [navigate, setOpenCancelConfirmation]);

  return {
    openCancelConfirmation,
    handleCancelConfirmation,
    handleCancelConfirmationDialog,
  };
}
