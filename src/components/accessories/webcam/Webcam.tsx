import React, { useCallback, useRef } from "react";
import Camera, { WebcamProps } from "react-webcam";

export type Props = Partial<WebcamProps> & {
  onCapture?: (image: string) => void;
};

const Webcam: React.FC<Props> = ({
  onCapture = () => {},
  ...props
}) => {
  const ref = useRef<null | Camera>(null);

  const capture = useCallback(
    () => {
      if (ref.current !== null) {
        const image = ref.current.getScreenshot();
        if (image) {
          onCapture(image);
        }
      }
    },
    [ref, onCapture]
  );

  return <>
    <Camera screenshotFormat="image/jpeg" style={{maxWidth: "100%"}} {...props} ref={ref} />
    <button onClick={capture}>Scatta</button>
  </>;
};

export default Webcam;
