import { useCallback } from "react";

export const useViewInOrthanc = (level: "study" | "series" | "instance") => {
  /**
   * Todo: Use value provided by the backend
   */
  const orthancExplorerUrl =
    process.env.REACT_APP_ORTHANC_EXPLORER_URL ||
    "https://orthanc.uni2growcameroun.com/app/explorer.html";
  const handleViewInOrthanc = useCallback(
    (row: any) => () => {
      window.open(`${orthancExplorerUrl}#${level}?uuid=${row.id}`, "_blank");
    },
    [level, orthancExplorerUrl]

  );

  return handleViewInOrthanc;
};
