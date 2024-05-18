import { privateConstants } from "../constants/privateConstants";

// NOTE: before using this URL, make sure Static Map API is enabled for this key through the GCP portal
const GOOGLE_MAPS_BASE_URL =
  "https://maps.googleapis.com/maps/api/staticmap?center=#LAT,#LNG&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C#LAT,#LNG&key=#API_KEY";

const GOOGLE_MAPS_GEOCODING_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng=#LAT,#LNG&key=#API_KEY";

export function getMapURL(lat: string, lng: string) {
  const mapURL = GOOGLE_MAPS_BASE_URL.replaceAll("#LAT", lat)
    .replaceAll("#LNG", lng)
    .replace("#API_KEY", privateConstants.GOOGLE_MAPS_API_KEY);
  return mapURL;
}

export async function getAddress(
  lat: string,
  lng: string
): Promise<Array<string | unknown>> {
  const revGeocodURL = GOOGLE_MAPS_GEOCODING_URL.replace("#LAT", lat)
    .replace("#LNG", lng)
    .replace("#API_KEY", privateConstants.GOOGLE_MAPS_API_KEY);

  let address, error;
  try {
    const response = await fetch(revGeocodURL);
    const result = await response.json();
    console.log({ result });
    const formattedAddress: string = result.results[0].formatted_address;
    address = formattedAddress;
  } catch (e) {
    error = e;
  }
  return [address, error];
}
