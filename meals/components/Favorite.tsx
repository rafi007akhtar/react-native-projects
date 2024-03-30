import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { favoriteMealsAtom } from "../data/globalState";

type FavoriteProps = {
  mealId: string;
};

export default function Favorite(props: FavoriteProps) {
  const [favoriteMeals, setFavoriteMeals] = useAtom(favoriteMealsAtom);
  const alreadyFavorite = useMemo(
    () => favoriteMeals.includes(props.mealId),
    []
  );
  const [isFavorite, setIsFavorite] = useState(alreadyFavorite);

  function pressHandler() {
    setIsFavorite((curr) => !curr);
  }

  useEffect(() => {
    if (isFavorite) {
      setFavoriteMeals((meals) => meals.concat(props.mealId));
    } else {
      const mealRemovedFromFavorites = favoriteMeals.filter(
        (id) => id !== props.mealId
      );
      setFavoriteMeals(mealRemovedFromFavorites);
    }
  }, [isFavorite]);

  return (
    <Pressable onPress={pressHandler}>
      <Ionicons
        name="heart"
        size={24}
        color={isFavorite ? "#ba4343d0" : "#ffffffa9"}
      />
    </Pressable>
  );
}
