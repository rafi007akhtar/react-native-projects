import { atom } from "jotai";
import { Places } from "../models/place.model";

export interface SelectedLocation {
  latitude: number;
  longitude: number;
}

export const defaultLocation = {
  latitude: 18.558512022770415,
  longitude: 73.74953057616949,
};

export const selectedLocationAtom = atom<SelectedLocation>(defaultLocation);
export const selectedImageAtom = atom("");
export const titleAtom = atom("");

export const placesAtom = atom<Places>([]);
