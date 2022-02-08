import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/Clear";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Webcam from "../../accessories/webcam/Webcam";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";
import { IProps } from "./types";
import { handlePictureSelection, preprocessImage } from "./utils";
import classNames from "classnames";

export const ProfilePicture: FunctionComponent<IProps> = ({
  isEditable,
  preLoadedPicture,
  onChange,
  shouldReset,
  resetCallback,
  style,
}) => {
  const [picture, setPicture] = useState({
    preview: profilePicturePlaceholder,
    original: "",
  });

  const [showError, setShowError] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showWebcam, setShowWebcam] = React.useState(false);
  const { t } = useTranslation();

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

  const choosePicture = () => pictureInputRef.current?.click();

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    closeWebcam();
  }

  const openWebcam = () => setShowWebcam(true);
  const closeWebcam = () => setShowWebcam(false);

  const removePicture = () => {
    setPicture({
      preview: profilePicturePlaceholder,
      original: "",
    });
    if (pictureInputRef.current) {
      pictureInputRef.current.value = "";
    }
  };

  const confirmWebcamPicture = useCallback((image: string) => {
    preprocessImage(setPicture, image);
    closeModal();
  }, [setPicture]);

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
      <div
        className={classNames("profilePicture_mask", { editable: isEditable })}
        style={style}
        onClick={openModal}
      >
        <img src={picture.preview} alt="profilePicture" />
        {picture.original ? (
          <div
            className="profilePicture_hoverButton profilePicture_editIcon"
            onClick={openModal}
          >
            <EditRoundedIcon fontSize="default" style={{ color: "white" }} />
          </div>
        ) : (
          <div
            className="profilePicture_hoverButton profilePicture_addIcon"
            onClick={openModal}
          >
            <AddRoundedIcon fontSize="default" style={{ color: "white" }} />
          </div>
        )}
      </div>
      {isEditable && (
        <div className="profilePicture_buttons">
          {picture.original ? (
            <div
              className="profilePicture_button profilePicture_removeIcon"
              onClick={removePicture}
            >
              <DeleteRoundedIcon fontSize="small" style={{ color: "white" }} />
            </div>
          ) : null}
        </div>
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
                {t("common.ok")}
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      ) : (
        ""
      )}
      <Dialog
        open={showModal}
        onClose={closeModal}
      >
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogTitle>{t("picture.edit")}</DialogTitle>
          {showWebcam && (
            <Webcam
              mirrored
              onResizeConfirm={confirmWebcamPicture}
            />
          )}
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button
              onClick={() => {
                closeModal();
                choosePicture();
              }}
              color="primary"
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
            >{t("picture.upload")}</Button>
            {!showWebcam && (
              <Button
                onClick={openWebcam}
                color="primary"
                variant="contained"
                startIcon={<PhotoCameraIcon />}
              >{t("picture.useWebcam")}</Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
