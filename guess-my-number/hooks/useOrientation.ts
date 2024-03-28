import { useEffect, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";

type DeviceOrientation = "portrait" | "landscape";

const window = Dimensions.get("window");
const initOrientation: DeviceOrientation =
  window.width > window.height ? "landscape" : "portrait";

export function useOrientation() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] =
    useState<DeviceOrientation>(initOrientation);

  useEffect(() => {
    width > height ? setOrientation("landscape") : setOrientation("portrait");
  }, [width, height]);

  return orientation;
}
