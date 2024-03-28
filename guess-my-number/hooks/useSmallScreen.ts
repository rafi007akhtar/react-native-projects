import { useWindowDimensions } from "react-native";
import { useOrientation } from "./useOrientation";
import { useEffect, useState } from "react";

export function useSmallScreen(widthBreakpoint = 300, heightBreakpoint = 450) {
  const orientation = useOrientation();
  const { width, height } = useWindowDimensions();

  const [smallDevice, setSmallDevice] = useState<boolean>(false);

  useEffect(() => {
    const testSmallDevice =
      (orientation === "portrait" && width < widthBreakpoint) ||
      (orientation === "landscape" && height < heightBreakpoint);
    setSmallDevice(testSmallDevice);
  }, [orientation, width, height]);

  return { smallDevice };
}
