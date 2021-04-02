import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";
import { IProps } from "./types";
import { handlePictureSelection, preprocessImage } from "./utils";

export const ProfilePicture: FunctionComponent<IProps> = ({
  isEditable,
  preLoadedPicture,
  onChange,
  shouldReset,
  resetCallback,
}) => {
  const [picture, setPicture] = useState({
    preview: profilePicturePlaceholder,
    original: "",
  });

  const [showError, setShowError] = React.useState("");

  const handleCloseError = () => {
    setShowError("");
  };

  useEffect(() => {
    if (preLoadedPicture) {
      preprocessImage(setPicture, preLoadedPicture);
    }
  }, [preLoadedPicture]);

  useEffect(() => {
    if (onChange) {
      onChange(picture.original);
    }
  }, [onChange, picture.original]);

  const pictureInputRef = useRef<HTMLInputElement>(null);

  const editPicture = () => pictureInputRef.current?.click();

  const removePicture = () => {
    setPicture({
      preview: profilePicturePlaceholder,
      original: "",
    });
    if (pictureInputRef.current) {
      pictureInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (shouldReset && resetCallback) {
      removePicture();
      resetCallback();
    }
  }, [shouldReset, resetCallback]);

  return (
    <div className="profilePicture">
      <input
        id="profilePicture_input"
        ref={pictureInputRef}
        style={{ display: "none" }}
        disabled={!isEditable}
        type="file"
        onChange={handlePictureSelection(setPicture, setShowError, 360000)}
      />
      <div className="profilePicture_mask">
        <img src={picture.preview} alt="profilePicture" />
      </div>
      {isEditable && (
        <Fragment>
          <div className="profilePicture_removeIcon" onClick={removePicture}>
            <DeleteRoundedIcon fontSize="small" style={{ color: "white" }} />
          </div>
          <div className="profilePicture_editIcon" onClick={editPicture}>
            <EditRoundedIcon fontSize="small" style={{ color: "white" }} />
          </div>
        </Fragment>
      )}
      {showError ? (
        <Dialog
          open={!!showError}
          onClose={handleCloseError}
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {showError}
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleCloseError} color="primary">
                Ok
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};
