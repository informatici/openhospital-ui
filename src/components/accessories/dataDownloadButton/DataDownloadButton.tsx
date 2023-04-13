import React, { FunctionComponent, useState } from "react";
import { IProps } from "./types";
import "./styles.scss";
import { CSVLink } from "react-csv";
import { IconButton, ListItemIcon, Typography } from "@material-ui/core";
import {
  CloudDownloadOutlined,
  SaveAlt as SaveAltIcon,
} from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";

const DataDownloadButton: FunctionComponent<IProps> = ({
  csvData,
  pdfData,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownloadCSV = () => {
    handleClose();
  };
  const handleDownloadPDF = () => {
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-controls="download-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SaveAltIcon />
      </IconButton>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDownloadCSV}>
          <CSVLink data={csvData}>
            <ListItemIcon>
              <CloudDownloadOutlined fontSize="small" />
            </ListItemIcon>
          </CSVLink>
          <Typography variant="inherit">CSV</Typography>
        </MenuItem>
        {pdfData && (
          <MenuItem onClick={handleDownloadPDF}>
            <ListItemIcon>
              <CloudDownloadOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">PDF</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DataDownloadButton;
