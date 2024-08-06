import CameraIcon from "@mui/icons-material/Camera";
import Button from "@mui/material/Button";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Camera, { WebcamProps } from "react-webcam";
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

  const capture = useCallback(() => {
    if (ref.current !== null) {
      const shot = ref.current.getScreenshot();
      if (shot) {
        setImage(shot);
        onCapture(shot);
      }
    }
  }, [ref, setImage, onCapture]);

  return image ? (
    <>
      <ImageResize
        imageToResize={image}
        onConfirm={onResizeConfirm}
        onReset={resetImage}
      />
    </>
  ) : (
    <>
      <Camera
        screenshotFormat="image/jpeg"
        style={{ maxWidth: "100%" }}
        {...props}
        ref={ref}
      />
      <Button
        className="takePicture_icon"
        onClick={capture}
        color="primary"
        variant="contained"
        startIcon={<CameraIcon />}
      >
        {t("picture.takePhoto")}
      </Button>
    </>
  );
};

export default Webcam;
