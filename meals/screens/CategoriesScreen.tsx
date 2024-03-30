import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryTile from "../components/CategoryTile";
import Category from "../models/category";

export default function CategoriesScreen(props: { navigation?: any }) {
  const navigation = props?.navigation;

  function tileClickHandler(dataItem: ListRenderItemInfo<Category>) {
    const categoryData = dataItem.item;
    navigation.navigate("MealsOverview", { categoryData }); // alternative: useNavigation
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={(dataItem) => {
        const { title, color } = dataItem.item;
        return (
          <CategoryTile
            title={title}
            color={color}
            onClick={() => tileClickHandler(dataItem)}
          />
        );
      }}
      keyExtractor={(dataItem) => dataItem.id}
      numColumns={2} // NOTE: this denotes the number of cols the flat list will take across the available width
      style={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {},
});
