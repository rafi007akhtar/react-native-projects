import { atom } from "jotai";

export const initState = {
  numberToGuess: "",
  numberConfirmedFlag: false,
  gameIsOver: false,
  numberOfGuesses: 0,
};

export const gamePlayAtom = atom(initState);
