import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { loginUser } from "../utils/auth.utils";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import useAuthStore from "../state/stores";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authenticate] = useAuthStore((state) => [state.authenticate]);

  async function loginHandler(credentials) {
    const { email, password } = credentials;

    setIsAuthenticating(true);
    const [response, error] = await loginUser(email, password);
    setIsAuthenticating(false);

    if (error) {
      Alert.alert("Something went wrong.", "Please check user id / password.");
      return;
    }

    const token = response?.data?.idToken;
    authenticate(token);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in ..." />;
  }

  return <AuthContent isLogin="true" onAuthenticate={loginHandler} />;
}

export default LoginScreen;
