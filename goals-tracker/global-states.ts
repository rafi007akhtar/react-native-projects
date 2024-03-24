import { atom } from "jotai";
import { Goal } from "./models/goals.model";

export const goals = atom([] as Array<Goal>);
export const showNewGoalsModal = atom(false);
