import { useState, useCallback } from "react";

export const useDialogStatus = () => {
  const [showItemPicker, setShowPicker] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleItemPicker = useCallback(() => {
    setShowPicker(!showItemPicker);
  }, [showItemPicker]);
  const handlePaymentDialog = useCallback(() => {
    setShowPaymentDialog(!showPaymentDialog);
  }, [showPaymentDialog]);

  return {
    showItemPicker,
    showPaymentDialog,
    handleItemPicker,
    handlePaymentDialog,
  };
};
