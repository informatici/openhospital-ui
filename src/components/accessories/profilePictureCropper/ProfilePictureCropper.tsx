import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import React, { FunctionComponent } from "react";
import ImageResize from "../imageResize/ImageResize";
import "./styles.scss";
import { IProps } from "./types";

export const ProfilePictureCropper: FunctionComponent<IProps> = ({
  picture,
  onSave,
  onReset,
  open,
}) => {
  return (
    <div className="croppedProfilePicture">
      <Dialog open={open} aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ImageResize
              imageToResize={picture}
              onConfirm={onSave}
              onReset={onReset}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
