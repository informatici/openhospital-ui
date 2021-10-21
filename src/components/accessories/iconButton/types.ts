import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface IProps {
  url: string;
  svgImage: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
