import { useMemo } from "react";
import {
  landingPagePriority,
  defaultRoute,
} from "../../customization/landingPage";
import { usePermissions } from "../permissionUtils/usePermissions";

/* Custom hook that returns the landing page route based on the user's permissions.
 * @returns {string} The landing page route.
 */
export const useLandingPageRoute = () => {
  const permissions = usePermissions();

  // Calculate the landing page route based on the user's permissions.
  const landingPageRoute = useMemo(
    () =>
      landingPagePriority.find((element) =>
        permissions.includes(element.permission)
      )?.route ?? defaultRoute,
    [permissions]
  );

  // Return the landing page route.
  return landingPageRoute;
};
