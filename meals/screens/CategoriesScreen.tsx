import { FlatList, StyleSheet, Text } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryTile from "../components/CategoryTile";

export default function CategoriesScreen() {
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={(dataItem) => {
        const { title, color } = dataItem.item;
        return (
          <CategoryTile
            title={title}
            color={color}
            onClick={() => {
              console.log(title, "clicked");
            }}
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
  listContainer: {
    marginTop: 12,
  },
});
