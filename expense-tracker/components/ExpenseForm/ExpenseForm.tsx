import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import { globalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { Expense, ExpenseDetails } from "../../models/expenses.model";
import { formatDate } from "../../utils/dates.util";

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseDetails) => void;
  isEditing: boolean;
  defaultValues: Expense | {};
}

export default function ExpenseForm(props: ExpenseFormProps) {
  const defaultValues = { ...props?.defaultValues } || {};
  const { amount, date, description } = defaultValues;

  const [formInputs, setFormInputs] = useState({
    amount: amount ? `${amount}` : "",
    date: date ? formatDate(date) : "",
    description: description || "",
  });

  function updateForm(fieldName: string, fieldVal: string) {
    setFormInputs((currVal) => {
      return { ...currVal, [fieldName]: fieldVal };
    });
  }

  function formSubmitHandler() {
    const expenseData: ExpenseDetails = {
      amount: +formInputs.amount,
      date: new Date(formInputs.date),
      description: formInputs.description,
    };
    props.onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>
        {props.isEditing ? "Modify Your Expense" : "Add An Expense"}
      </Text>
      <View style={styles.inputsRow}>
        <Input
          labelText="Amount (₹)"
          keyboardType="number-pad"
          style={styles.fullSpace}
          onChangeText={updateForm.bind(this, "amount")}
          value={formInputs.amount}
        ></Input>
        <Input
          labelText="Date"
          placeholder="yyyy-mm-dd"
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

      <View style={styles.buttons}>
        <Button mode="flat" onPress={props.onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={formSubmitHandler} style={styles.button}>
          {props.isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginTop: 8,
  },
});
