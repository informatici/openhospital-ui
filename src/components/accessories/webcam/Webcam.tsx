import React, { useCallback, useRef, useState } from "react";
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
      <button onClick={resetImage}>Scatta un'altra foto</button>
    </>
  ) : (
    <>
      <Camera screenshotFormat="image/jpeg" style={{maxWidth: "100%"}} {...props} ref={ref} />
      <button onClick={capture}>Scatta</button>
    </>
  );
};

export default Webcam;
