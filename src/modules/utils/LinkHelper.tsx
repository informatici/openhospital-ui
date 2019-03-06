import * as React from "react";
import Link from '@material-ui/core/Link';
import { LinkProps, NavLinkProps } from 'react-router-dom';


export const MaterialLinkRouter = (props: LinkProps) => {
  return (
    <Link {...props} />
  );
}

export const MaterialNavLinkRouter = (props: NavLinkProps) => {
  return (
    <Link {...props} />
  );
}