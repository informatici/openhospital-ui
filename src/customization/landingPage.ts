import { TPermission } from "../types";

export type TLandingPagePriority = {
  permission: TPermission;
  route: string;
};

export const defaultRoute = "/patients";

// Landing page will be the first route matching permission,
// you can change priority rules by moving elements in this list
export const landingPagePriority: TLandingPagePriority[] = [
  {
    permission: "dashboard.access",
    route: "/dashboard",
  },
  {
    permission: "patients.access",
    route: "/patients",
  },
  {
    permission: "laboratories.access",
    route: "/laboratory",
  },
  {
    permission: "visits.access",
    route: "/visits",
  },
];
