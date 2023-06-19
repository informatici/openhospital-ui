import { useMemo } from "react";
import { landingPagePriority } from "../../customization/landingPage";
import { defaultRoute } from "../../routes/const";
import { TPermission } from "../../types";
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
