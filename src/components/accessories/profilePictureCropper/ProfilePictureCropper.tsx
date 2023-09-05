import React, { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCrop, { Crop } from "react-image-crop";
import Cropper from "react-easy-crop";
import "./styles.scss";
import { IProps } from "./types";
import { useEffect, useMemo } from "@storybook/addons";
import getCroppedImg from "../../../libraries/uiUtils/imageUtils";
import { image } from "pdfkit";
import { useStyles } from "./styles";
import {
  Typography,
  Slider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { CustomDialog } from "../customDialog/CustomDialog";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

export const ProfilePictureCropper: FunctionComponent<IProps> = ({
  picture,
  rounded,
  onSave,
  onClose,
  open,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "px",
  });
  const [croppedImage, setCroppedImage] = useState(null);

  const image = `data:image/png;base64,${picture}`;

  const showCroppedImage = useCallback(
    async (value, percentValue) => {
      try {
        const croppedImage = await getCroppedImg(image, value);
        setCroppedImage(croppedImage as any);
      } catch (e) {
        console.error(e);
      }
    },
    [setCroppedImage, image, crop]
  );

  const handleSave = useCallback(() => {
    if (croppedImage) {
      onSave(croppedImage);
      onClose();
    }
  }, [onSave, croppedImage, onClose]);

  return (
    <div className="croppedProfilePicture">
      <Dialog
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactCrop
              src={image}
              crop={crop}
              onChange={setCrop}
              onComplete={showCroppedImage}
              circularCrop={rounded ?? true}
            />
          </DialogContentText>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              {t("common.discard")}
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              {t("common.ok")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
