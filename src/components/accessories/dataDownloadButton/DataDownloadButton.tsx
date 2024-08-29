import {
  DescriptionOutlined,
  ImageOutlined,
  SaveAlt as SaveAltIcon,
  ViewHeadlineOutlined,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import {
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { IOwnProps } from "./types";

const DataDownloadButton: FunctionComponent<IOwnProps> = ({
  csvData,
  graphRef,
  title,
}) => {
  const { t } = useTranslation();
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
    exportComponentAsPDF(graphRef, {
      fileName: title,
      pdfOptions: { pdfFormat: "a3", orientation: "l" },
    });
  };

  const handleDownloadPNG = () => {
    handleClose();
    exportComponentAsPNG(graphRef, { fileName: title });
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
          <CSVLink data={csvData} filename={title ?? "data"}>
            <ListItemIcon>
              <ViewHeadlineOutlined fontSize="small" />
            </ListItemIcon>
          </CSVLink>
          <Typography variant="inherit">{t("dashboard.csv")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleDownloadPDF}>
          <ListItemIcon>
            <DescriptionOutlined fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{t("dashboard.pdf")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleDownloadPNG}>
          <ListItemIcon>
            <ImageOutlined fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{t("dashboard.png")}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DataDownloadButton;
