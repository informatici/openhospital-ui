import { useState, useCallback } from "react";

export const useDialogStatus = () => {
  const [showItemPicker, setShowPicker] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleItemPicker = useCallback(() => {
    setShowPicker(!showItemPicker);
  }, [showItemPicker]);
  const handlePaymentDialog = useCallback(() => {
    setShowPaymentDialog(!showPaymentDialog);
  }, [showPaymentDialog]);

  const handleSaveDialog = useCallback(() => {
    setOpenSaveDialog(!openSaveDialog);
  }, [openSaveDialog]);

  return {
    showItemPicker,
    showPaymentDialog,
    openSaveDialog,
    handleSaveDialog,
    handleItemPicker,
    handlePaymentDialog,
  };
};
