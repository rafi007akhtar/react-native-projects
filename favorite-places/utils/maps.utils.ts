import { privateConstants } from "../constants/privateConstants";

// NOTE: before using this URL, make sure Static Map API is enabled for this key through the GCP portal
const GOOGLE_MAPS_BASE_URL =
  "https://maps.googleapis.com/maps/api/staticmap?center=#LAT,#LNG&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C#LAT,#LNG&key=#API_KEY";

export function getMapURL(lat: string, lng: string) {
  const mapURL = GOOGLE_MAPS_BASE_URL.replaceAll("#LAT", lat)
    .replaceAll("#LNG", lng)
    .replace("#API_KEY", privateConstants.GOOGLE_MAPS_API_KEY);
  console.log({ mapURL });
  return mapURL;
}
