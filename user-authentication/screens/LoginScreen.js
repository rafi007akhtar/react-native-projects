import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { loginUser } from "../utils/auth.utils";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler(credentials) {
    const { email, password } = credentials;

    setIsAuthenticating(true);
    const [response, error] = await loginUser(email, password);
    setIsAuthenticating(false);

    console.log([response, error]);
    if (error) {
      Alert.alert("Something went wrong.", "Please check user id / password.");
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in ..." />;
  }

  return <AuthContent isLogin="true" onAuthenticate={loginHandler} />;
}

export default LoginScreen;
