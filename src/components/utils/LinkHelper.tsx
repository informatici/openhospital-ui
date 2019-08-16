import * as React from "react";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
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
export const MaterialCardActionAreaRouter = (props: LinkProps) => {
  return (
    <CardActionArea {...props} />
  );
}
export const MaterialButtonRouter = (props: LinkProps) => {
  return (
    <Button {...props} />
  );
}