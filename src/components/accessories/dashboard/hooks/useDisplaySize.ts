import { useCallback, useState } from "react";

export const useDisplaySize = () => {
  const [displaySize, setDisplaySize] = useState<{
    width: number;
    height: number;
  }>();

  const onSizeChange = useCallback(
    (width: number, height: number) => {
      setDisplaySize({ width: width - 1, height: height - 73 });
    },
    [setDisplaySize]
  );

  return { displaySize, onSizeChange };
};
