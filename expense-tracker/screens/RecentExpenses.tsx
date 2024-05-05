import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import useStore from "../state/stores";
import { getDateMinusDays } from "../utils/dates.util";
import httpUtils from "../utils/http.utils";
import Spinner from "../components/UI/Spinner";

export default function RecentExpenses() {
  const [expenses, setExpenses] = useStore((state) => [
    state.expenses,
    state.setExpenses,
  ]);
  const [localWaitingState, setLocalWaitingState] = useState(false);

  useEffect(() => {
    async function obtainExpenses() {
      setLocalWaitingState(true);
      const [expenses, err] = await httpUtils.fetchExpenses();
      setLocalWaitingState(false);
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

  let screen: React.JSX.Element;
  if (localWaitingState) {
    screen = <Spinner />;
  } else {
    screen = (
      <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
    );
  }

  return screen;
}
