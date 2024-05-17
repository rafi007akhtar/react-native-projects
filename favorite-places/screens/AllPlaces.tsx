import { useAtom } from "jotai";
import PlacesList from "../components/Places/PlacesList";
import { placesAtom } from "../state/atoms";

export default function AllPlaces() {
  const [places] = useAtom(placesAtom);
  return <PlacesList places={places} />;
}
