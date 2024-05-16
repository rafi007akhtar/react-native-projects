import { atom } from "jotai";

interface SelectedLocation {
  latitude: number;
  longitude: number;
}

export const selectedLocationAtom = atom<SelectedLocation>({
  latitude: 18.558512022770415,
  longitude: 73.74953057616949,
});
