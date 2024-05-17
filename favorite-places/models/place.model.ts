interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  title: string;
  imageUri: string;
  address: string;
  location: Location;
  id: string;
}

export type Places = Array<Place>;
