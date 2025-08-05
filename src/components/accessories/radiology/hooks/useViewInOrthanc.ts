import { useCallback } from "react";

export const useViewInOrthanc = (level: "study" | "series" | "instance") => {
  /**
   * Todo: Use value provided by the backend
   */
  const ORTHANC_EXPLORER =
    "https://orthanc.uni2growcameroun.com/app/explorer.html";
  const handleViewInOrthanc = useCallback(
    (row: any) => () => {
      window.open(`${ORTHANC_EXPLORER}#${level}?uuid=${row.id}`, "_blank");
    },
    [level]
  );

  return handleViewInOrthanc;
};
