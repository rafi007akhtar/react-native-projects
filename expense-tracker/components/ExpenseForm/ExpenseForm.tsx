import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import { globalStyles } from "../../constants/styles";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import {
  Expense,
  ExpenseDetails,
  ExpenseFormInputs,
} from "../../models/expenses.model";
import { formatDate } from "../../utils/dates.util";
import { validateExpenseForm } from "../../utils/validators.util";
import { FormErrors } from "../../models/errors.model";

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseDetails) => void;
  isEditing: boolean;
  defaultValues: Expense;
}

export default function ExpenseForm(props: ExpenseFormProps) {
  const defaultValues = { ...props?.defaultValues };
  const { amount, date, description } = defaultValues;

  const [formInputs, setFormInputs] = useState<ExpenseFormInputs>({
    amount: amount ? `${amount}` : "",
    date: date ? formatDate(date) : "",
    description: description || "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expenseData, setExpenseData] = useState<ExpenseDetails>();

  const [errors, setErrors] = useState<FormErrors>({});
  // NOTE: useEffect here is indispensable, because other parts of the application
  // are likely not having the latest values of the state variables
  useEffect(() => {
    if (formSubmitted && !Object.keys(errors).length) {
      props.onSubmit(expenseData);
    }
  }, [formSubmitted, errors, expenseData]);

  function updateForm(fieldName: string, fieldVal: string) {
    setFormSubmitted(false);
    setFormInputs((currVal) => {
      return { ...currVal, [fieldName]: fieldVal };
    });
    errors[fieldName] = undefined;
  }

  function formSubmitHandler() {
    const expenseDataObj: ExpenseDetails = {
      amount: +formInputs.amount,
      date: new Date(formInputs.date),
      description: formInputs.description,
    };
    setExpenseData(expenseDataObj);
    setErrors(validateExpenseForm(expenseDataObj));
    setFormSubmitted(true);
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
          errorMessage={errors?.amount}
          error={!!errors?.amount}
        ></Input>

        <Input
          labelText="Date"
          placeholder="yyyy-mm-dd"
          placeholderTextColor={globalStyles.colors.gray700}
          maxLength={10}
          onChangeText={updateForm.bind(this, "date")}
          value={formInputs.date}
          style={styles.fullSpace}
          errorMessage={errors?.date}
          error={!!errors?.date}
        ></Input>
      </View>

      <Input
        labelText="Description"
        multiline={true}
        numberOfLines={5}
        onChangeText={updateForm.bind(this, "description")}
        value={formInputs.description}
        errorMessage={errors?.description}
        error={!!errors?.description}
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
