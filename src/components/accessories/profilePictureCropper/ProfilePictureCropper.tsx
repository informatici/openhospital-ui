import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import ImageResize from "../imageResize/ImageResize";

export const ProfilePictureCropper: FunctionComponent<IProps> = ({
  picture,
  onSave,
  onReset,
  open,
}) => {
  const image = `data:image/png;base64,${picture}`;

  return (
    <div className="croppedProfilePicture">
      <Dialog open={open} aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ImageResize
              imageToResize={image}
              onConfirm={onSave}
              onReset={onReset}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
