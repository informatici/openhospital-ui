import { TPermission } from "../types";

type TLandingPagePriority = {
  permission: TPermission;
  route: string;
};

// Landing page will be the first route matching permission,
// you can change priority rules by moving elements in this list
export const landingPagePriority: TLandingPagePriority[] = [
  {
    permission: "dashboard.access",
    route: "/dashboard",
  },
  {
    permission: "patient.access",
    route: "/patients",
  },
  {
    permission: "laboratory.access",
    route: "/laboratory",
  },
  {
    permission: "visit.access",
    route: "/visits",
  },
];
