import React, { useCallback, useRef, useState } from "react";
import Camera, { WebcamProps } from "react-webcam";

export type Props = Partial<WebcamProps> & {
  onCapture?: (image: string) => void;
};

const Webcam: React.FC<Props> = ({
  onCapture = () => {},
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
        }
      }
    },
    [ref, setImage]
  );

  return image ? (
    <>
      <img src={image} alt="" />
      <button onClick={resetImage}>Reset</button>
      <button onClick={() => onCapture(image)}>Scegli</button>
    </>
  ) : (
    <>
      <Camera screenshotFormat="image/jpeg" style={{maxWidth: "100%"}} {...props} ref={ref} />
      <button onClick={capture}>Scatta</button>
    </>
  );
};

export default Webcam;
