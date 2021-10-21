import React, { FunctionComponent } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { IProps } from "./types";
import { useTranslation } from "react-i18next";

const SplitButton: FunctionComponent<IProps> = ({
  type,
  label,
  descriptions,
  onClick
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { t } = useTranslation();

  // const handleClick = () => {
  //   console.info(`You clicked ${descriptions[selectedIndex]}`);
  // };

  // const handleMenuItemClick = (
  //   event: React.MouseEvent<Element, MouseEvent>,
  //   index: number,
  // ) => {
  //   onClick(index);
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <span ref={anchorRef} >
      {/*   <ButtonGroup  aria-label="split button"> color="primary" ref={anchorRef} */}
          {/* <Button
            onClick={handleClick}>{label}
          </Button> */}
          <Button
            type={type}
            // variant="contained"
            // color="primary"
            // size="small"
            className="ohsplitbutton"  
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            // aria-label={label}
            aria-haspopup="menu"
            onClick={handleToggle}
          > 
            <div className="button__label"> {label}</div>
            <ArrowDropDownIcon />
          </Button>
        {/* </ButtonGroup> */}
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    { descriptions.map((description, index) =>
                     (
                        <MenuItem
                          key={index}
                          onClick={(event) => { if(onClick) onClick(event, index); handleToggle(); }}
                          >
                          {description}
                        </MenuItem>)
                    )
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </span>
  );
}

export default SplitButton;