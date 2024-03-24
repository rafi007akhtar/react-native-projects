import { ReactNode } from "react";

export type BaseProp = {
  children?: ReactNode;
};

export interface PrimaryBtnProps extends BaseProp {
  onClick?: () => {} | void;
}
