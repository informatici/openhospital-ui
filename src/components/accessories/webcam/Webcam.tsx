import React, { useCallback, useRef, useState } from "react";
import Camera, { WebcamProps } from "react-webcam";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CameraIcon from "@material-ui/icons/Camera";
import ClearIcon from "@material-ui/icons/Clear";
import ImageResize from "../imageResize/ImageResize";

export type Props = Partial<WebcamProps> & {
  onCapture?: (image: string) => void;
  onResizeConfirm: (image: string) => void;
};

const Webcam: React.FC<Props> = ({
  onCapture = () => {},
  onResizeConfirm,
  ...props
}) => {
  const ref = useRef<null | Camera>(null);
  const [image, setImage] = useState<string | null>(null);
  const resetImage = () => setImage(null);
  const { t } = useTranslation();

  const capture = useCallback(
    () => {
      if (ref.current !== null) {
        const shot = ref.current.getScreenshot();
        if (shot) {
          setImage(shot);
          onCapture(shot);
        }
      }
    },
    [ref, setImage, onCapture]
  );

  return image ? (
    <>
      <ImageResize imageToResize={image} onConfirm={onResizeConfirm} />
      <Button
        onClick={resetImage}
        variant="contained"
        startIcon={<ClearIcon />}
        style={{ marginLeft: 8 }}
      >{t("picture.useWebcamAgain")}</Button>
    </>
  ) : (
    <>
      <Camera screenshotFormat="image/jpeg" style={{maxWidth: "100%"}} {...props} ref={ref} />
      <IconButton onClick={capture}><CameraIcon /></IconButton>
    </>
  );
};

export default Webcam;
