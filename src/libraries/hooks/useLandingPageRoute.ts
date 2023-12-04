import { useMemo } from "react";
import {
  landingPagePriority,
  defaultRoute,
} from "../../customization/landingPage";
import { usePermissions } from "../permissionUtils/usePermissions";
import { useUserSettings } from "./useUserSettings";

/* Custom hook that returns the landing page route based on the user's permissions.
 * @returns {string} The landing page route.
 */
export const useLandingPageRoute = () => {
  const permissions = usePermissions();
  const settings = useUserSettings();

  // Calculate the landing page route based on the user's permissions.
  const landingPageRoute = useMemo(() => {
    const route =
      settings.find((e) => e.configName === "landing")?.configValue ?? "/";
    const matched = landingPagePriority
      .filter((e) => permissions.includes(e.permission))
      .map((e) => e.route);
    return matched.length > 0
      ? matched.includes(route ?? "")
        ? route
        : matched[0]
      : defaultRoute;
  }, [permissions, settings]);

  // Return the landing page route.
  return landingPageRoute;
};
