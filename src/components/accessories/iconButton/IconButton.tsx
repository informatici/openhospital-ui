import React, { FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";
import SvgIcon from '@material-ui/core/SvgIcon';

const IconButtonComponent: FunctionComponent<IProps> = (
  props
 ) => { 

  return (
   <span>
         {new Array(<a href={props.url}><SvgIcon component={props.svgImage}/></a>)}
      </span>
  );
};

export default IconButtonComponent;
