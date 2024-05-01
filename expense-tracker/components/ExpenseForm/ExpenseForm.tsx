import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import { globalStyles } from "../../constants/styles";
import { useState } from "react";

export default function ExpenseForm() {
  const [formInputs, setFormInputs] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function updateForm(fieldName: string, fieldVal: string) {
    setFormInputs((currVal) => {
      return { ...currVal, [fieldName]: fieldVal };
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Modify Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          labelText="Amount"
          keyboardType="number-pad"
          style={styles.fullSpace}
          onChangeText={updateForm.bind(this, "amount")}
          value={formInputs.amount}
        ></Input>
        <Input
          labelText="Date"
          placeholder="dd-mm-yyyy"
          placeholderTextColor={globalStyles.colors.gray700}
          maxLength={10}
          onChangeText={updateForm.bind(this, "date")}
          value={formInputs.date}
          style={styles.fullSpace}
        ></Input>
      </View>
      <Input
        labelText="Description"
        multiline={true}
        numberOfLines={5}
        onChangeText={updateForm.bind(this, "description")}
        value={formInputs.description}
      ></Input>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontFamily: "product-sans-bold",
    textAlign: "center",
    marginVertical: 12,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fullSpace: {
    flex: 1,
  },
});
