import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import useStore from "../state/stores";
import { getDateMinusDays } from "../utils/dates.util";

export default function RecentExpenses() {
  const expenses = useStore((state) => state.expenses);

  const today = new Date();
  const dateLastWeek = getDateMinusDays(today, 7);

  const recentExpenses = expenses.filter(
    (expense) => expense.date > dateLastWeek
  );

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
  );
}
