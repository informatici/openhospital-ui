import { useEffect, useState } from "react";
import { feedbackProps } from "../../components/accessories/feedback/utils";
import { useOnlineStatus } from "./useOnlineStatus";

export const useShowHelp = () => {
  const online = useOnlineStatus();
  const [showHelp, setShowHelp] = useState(online && feedbackProps.enabled);

  useEffect(() => {
    setShowHelp(online && feedbackProps.enabled);
  }, [online]);

  return showHelp;
};
