import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/Clear";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import classNames from "classnames";
import { isEmpty } from "lodash";
import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import Webcam from "../../accessories/webcam/Webcam";
import { ProfilePictureCropper } from "../profilePictureCropper/ProfilePictureCropper";
import "./styles.scss";
import { IProps } from "./types";
import {
  extractPictureFromSelection,
  preprocessImage
} from "./utils";

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

  const [showError, setShowError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [fromFileSystem, setFromFileSystem] = useState(false);
  const [pictureToResize, setPictureToResize] = useState("");
  const { t } = useTranslation();

  const handleCloseError = () => {
    removePicture();
    setShowError("");
  };

  useEffect(() => {
    if (preLoadedPicture) {
      setPicture({
        preview: "data:image/jpeg;base64," + preLoadedPicture,
        original: preLoadedPicture,
      });
    }
  }, [preLoadedPicture]);

  useEffect(() => {
    if (onChange) {
      onChange(picture.original);
    }
  }, [onChange, picture.original]);

  useEffect(() => {
    if (!showModal && !isEmpty(pictureToResize) && fromFileSystem) {
      setFromFileSystem(false);
      openCropper();
    }
  }, [pictureToResize]);

  const pictureInputRef = useRef<HTMLInputElement>(null);

  const choosePicture = () => pictureInputRef.current?.click();

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    closeWebcam();
  };

  const openWebcam = () => setShowWebcam(true);
  const closeWebcam = () => setShowWebcam(false);
  const openCropper = () => setShowCropper(true);
  const closeCropper = () => setShowCropper(false);

  const removePicture = () => {
    setPictureToResize("");
    setPicture({
      preview: profilePicturePlaceholder,
      original: "",
    });
    if (pictureInputRef.current) {
      pictureInputRef.current.value = "";
    }
  };

  const handleCropped = useCallback(
    (value: string) => {
      preprocessImage(setPicture, value, setShowError);
      closeCropper();
    },
    [setPicture]
  );

  const confirmWebcamPicture = useCallback(
    (image: string) => {
      preprocessImage(setPicture, image, setShowError);
      closeModal();
    },
    [setPicture]
  );

  const handleChange = useCallback(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      setFromFileSystem(true);
      extractPictureFromSelection(setPictureToResize)(e);
    },
    [setPictureToResize]
  );

  const handleReset = () => {
    closeCropper();
    removePicture();
    pictureInputRef.current?.click();
  };

  useEffect(() => {
    if (shouldReset && resetCallback) {
      removePicture();
      resetCallback();
    }
  }, [shouldReset, resetCallback]);

  return (
    <div data-cy="profile-picture" className="profilePicture">
      <ProfilePictureCropper
        open={showCropper}
        onSave={handleCropped}
        onReset={handleReset}
        picture={pictureToResize}
      />
      <input
        data-cy="profile-picture-input"
        id="profilePicture_input"
        ref={pictureInputRef}
        style={{ display: "none" }}
        disabled={!isEditable}
        type="file"
        accept="image/*"
        onChange={handleChange()}
      />
      <div
        className={classNames("profilePicture_mask", { editable: isEditable })}
        style={style}
        onClick={isEditable ? openModal : () => {}}
      >
        <img src={picture.preview} alt="profilePicture" />
        {picture.original ? (
          <div
            className="profilePicture_hoverButton profilePicture_editIcon"
            onClick={isEditable ? openModal : () => {}}
          >
            <EditRoundedIcon fontSize="inherit" style={{ color: "white" }} />
          </div>
        ) : (
          <div
            className="profilePicture_hoverButton profilePicture_addIcon"
            onClick={isEditable ? openModal : () => {}}
          >
            <AddRoundedIcon fontSize="inherit" style={{ color: "white" }} />
          </div>
        )}
      </div>
      {isEditable && (
        <div className="profilePicture_buttons">
          {picture.original ? (
            <div
              data-cy="remove-profile-picture"
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
        className="dialog_takePicture"
        open={showModal}
        onClose={closeModal}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <strong>{t("picture.edit")}</strong>
            </Box>
            <Box>
              <IconButton onClick={closeModal}>
                <GridCloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {showWebcam && (
            <Webcam mirrored onResizeConfirm={confirmWebcamPicture} />
          )}
          {!showWebcam && (
            <>
              <DialogActions className="dialog__actions">
                <Button
                  onClick={() => {
                    closeModal();
                    choosePicture();
                  }}
                  color="primary"
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                  data-cy="dialod-choose-photo-button"
                >
                  {t("picture.upload")}
                </Button>
                <Button
                  onClick={openWebcam}
                  color="primary"
                  variant="contained"
                  startIcon={<PhotoCameraIcon />}
                >
                  {t("picture.useWebcam")}
                </Button>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
