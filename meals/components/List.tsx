import { View, StyleSheet, Text } from "react-native";

type ListProps = {
  data: Array<any>;
  type?: "ordered" | "unordered";
};

export function List(props: ListProps) {
  let { data, type } = props;
  type = type || "ordered";

  const unorderedBullet = "•";

  const ListJSX = data.map((item, ind) => (
    <View key={ind} style={styles.container}>
      <View style={styles.listItemContainer}>
        <Text style={styles.listItem}>
          {type === "unordered" ? unorderedBullet : `${ind + 1}.`}
        </Text>
        <Text style={[styles.listItemText, styles.listItem]}>{item}</Text>
      </View>
    </View>
  ));
  return ListJSX;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  listItemContainer: {
    flexDirection: "row",
  },
  listItemText: {
    paddingHorizontal: 8,
  },
  listItem: {
    fontFamily: "product-sans",
  },
});
