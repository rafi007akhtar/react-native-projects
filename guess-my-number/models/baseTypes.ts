import { ReactNode } from "react";

export type BaseProp = {
  children?: ReactNode;
};

export interface PrimaryBtnProps extends BaseProp {
  onClick?: () => {} | void;
}

export interface StylesProp extends BaseProp {
  style?: object;
}
