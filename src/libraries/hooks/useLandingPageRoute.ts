import { useMemo } from "react";
import { TPermission } from "../../types";
import { usePermissions } from "../permissionUtils/usePermissions";

/* Custom hook that returns the landing page route based on the user's permissions.
 * @returns {string|null} The landing page route or null if no permission matched.
 */
export const useLandingPageRoute = () => {
  const permissions = usePermissions();

  // Define the possible permissions to match to routes.
  const PERMISSIONS: Record<string, TPermission> = {
    DASHBOARD: "dashboard.access",
    PATIENT: "patient.access",
    LABORATORY: "laboratory.access",
    VISIT: "visit.access",
  };

  // Calculate the landing page route based on the user's permissions.
  const landingPageRoute = useMemo(() => {
    if (permissions.includes(PERMISSIONS.DASHBOARD)) {
      return "/dashboard";
    }
    if (permissions.includes(PERMISSIONS.PATIENT)) {
      return "/patients";
    }
    if (permissions.includes(PERMISSIONS.LABORATORY)) {
      return "/laboratory";
    }
    if (permissions.includes(PERMISSIONS.VISIT)) {
      return "/visits";
    }
    return null;
  }, [permissions]);

  // Return the landing page route.
  return landingPageRoute;
};
