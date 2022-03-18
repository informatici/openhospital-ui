import { useEffect, useState } from "react";
import { feedbackConfig } from "../../customization/feedback";
import { useOnlineStatus } from "./useOnlineStatus";

export const useShowHelp = () => {
  const online = useOnlineStatus();
  const [showHelp, setShowHelp] = useState(online && feedbackConfig.enabled);

  useEffect(() => {
    setShowHelp(online && feedbackConfig.enabled);
  }, [online]);

  return showHelp;
};
