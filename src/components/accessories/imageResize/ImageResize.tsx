import React, { useCallback, useState } from "react";
import ImageCrop, { Crop } from "react-image-crop";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "react-image-crop/dist/ReactCrop.css";
import Button from "../button/Button";
import "./styles.scss";

interface Props {
  imageToResize: string;
  onConfirm: (image: string) => void;
  onReset: () => void;
}

const ImageResize: React.FC<Props> = ({
  imageToResize,
  onConfirm,
  onReset,
}) => {
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    aspect: 1,
    x: 50,
    y: 50,
    width: 300,
    height: 300,
    unit: "px",
  });
  const { t } = useTranslation();

  const confirm = useCallback(() => {
    if (imageRef) {
      const canvas = document.createElement("canvas");
      const pixelRatio = window.devicePixelRatio;
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
          imageRef,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
      }

      onConfirm(canvas.toDataURL("image/jpeg", 1));
    }
  }, [imageRef, crop, onConfirm]);

  return (
    <>
      <ImageCrop
        src={imageToResize}
        crop={crop}
        className="image_resize"
        onImageLoaded={(img) => setImageRef(img)}
        onChange={(newCrop) => setCrop(newCrop)}
        // onComplete={(finalCrop) => onCropComplete(finalCrop)}
      />
      <div className="image_resize_button_wrappers">
        <Button
          type={"button"}
          onClick={onReset}
          variant="contained"
          color="inherit"
        >
          <ClearIcon />
          {t("picture.useWebcamAgain")}
        </Button>
        <Button
          type={"button"}
          onClick={confirm}
          variant="contained"
          color="primary"
        >
          <CheckIcon />
          {t("common.confirm")}
        </Button>
      </div>
    </>
  );
};

export default ImageResize;
