import { useCallback, useState } from "react";

export function useDisclosure() {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen((previous) => !previous);
  }, [setOpen]);

  return {
    open,
    handleOpen,
    handleClose,
    handleChange: setOpen,
    toggle,
  };
}
