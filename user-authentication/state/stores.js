import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  // state goes here
  token: "",
  isAuthenticated: false,

  // actions go here
  authenticate: (authToken) => {
    set(() => {
      return { token: authToken, isAuthenticated: true };
    });
    AsyncStorage.setItem("token", authToken);
  },
  logout() {
    set(() => {
      return { token: "", isAuthenticated: false };
    });
  },
}));

export default useAuthStore;
