import { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import useStore from "../state/stores";
import { getDateMinusDays } from "../utils/dates.util";
import httpUtils from "../utils/http.utils";

export default function RecentExpenses() {
  const [expenses, setExpenses] = useStore((state) => [
    state.expenses,
    state.setExpenses,
  ]);

  useEffect(() => {
    async function obtainExpenses() {
      const [expenses, err] = await httpUtils.fetchExpenses();
      if (err) {
        console.error(err);
        return;
      }

      setExpenses(expenses);
    }
    obtainExpenses();
  }, []);

  const today = new Date();
  const dateLastWeek = getDateMinusDays(today, 7);

  const recentExpenses = expenses.filter(
    (expense) => expense.date > dateLastWeek
  );

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
  );
}
