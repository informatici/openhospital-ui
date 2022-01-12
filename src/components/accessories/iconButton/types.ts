import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface IProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  url?: string | undefined;
  svgImage: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
