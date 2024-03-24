type iShadowObj = {
  shadowColor: string;
  shadowOffset: {};
  shadowOpacity: number;
  shadowRadius: number;
};

export function iShadow(
  color?: string,
  offset?: Array<number>,
  opacity?: number,
  radius?: number
): iShadowObj | any {
  const shadowProp = {
    shadowColor: "",
    shadowOffset: {},
    shadowOpacity: NaN,
    shadowRadius: NaN,
  };

  if (color) {
    shadowProp.shadowColor = color;
  }
  if (offset) {
    const [width, height] = offset;
    shadowProp.shadowOffset = { width, height };
  }
  if (opacity) {
    shadowProp.shadowOpacity = opacity;
  }
  if (radius) {
    shadowProp.shadowRadius = radius;
  }

  return shadowProp as iShadowObj | any;
}
