import { useState, useLayoutEffect, useCallback } from "react";

type IUseWindowWidth = () => number;

export const useWindowWidth: IUseWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const resizeWatcher = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    resizeWatcher();
    window.addEventListener("resize", resizeWatcher);
    return () => window.removeEventListener("resize", resizeWatcher);
  }, [resizeWatcher]);

  return width;
};
