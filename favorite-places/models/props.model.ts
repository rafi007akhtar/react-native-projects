import { ReactNode } from "react";
import { Place, Places } from "./place.model";

export interface BaseProps {
  children?: ReactNode;
}

export interface PlacesListProps extends BaseProps {
  places: Places;
}

export interface PlaceProps extends BaseProps {
  place: Place;
  onClick?: () => void;
}

export interface OutlinedButtonProps extends BaseProps {
  onPress?: () => void;
  icon: string | any;
}
