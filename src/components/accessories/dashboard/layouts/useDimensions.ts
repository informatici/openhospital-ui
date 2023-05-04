import React from "react";

export const useDimensions = (ref: React.RefObject<Element>) => {
  const [dimensions, setDimensions] =
    React.useState<{ width: number; height: number }>();

  //console.log(ref.current);

  React.useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      console.log(boundingRect);
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    }

    console.log("Ref changed");
  }, [ref]);

  //console.log(dimensions);

  return dimensions;
};
