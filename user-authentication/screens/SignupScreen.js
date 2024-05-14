import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth.utils";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import useAuthStore from "../state/stores";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authenticate] = useAuthStore((state) => [state.authenticate]);

  async function signupHandler(credentials) {
    const { email, password } = credentials;
    setIsAuthenticating(true);
    const [response, error] = await createUser(email, password);
    setIsAuthenticating(false);

    if (error) {
      Alert.alert(
        "Something went wrong",
        "Please check the entered credentials."
      );
      return;
    }

    const token = response?.data?.idToken;
    authenticate(token);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user ..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
