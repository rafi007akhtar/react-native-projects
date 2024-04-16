import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import useStore from "../state/stores";

export default function AllExpenses() {
  const expenses = useStore((state) => state.expenses);
  return <ExpensesOutput expensesPeriod="Total" expenses={expenses} />;
}
