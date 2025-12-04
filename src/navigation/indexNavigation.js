import { NavigationContainer } from "@react-navigation/native";
import { useSession } from "../utils/SessionContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
export default function IndexNavigation() {
  const { userauth } = useSession();
  // TODO: Revertir a {userauth ? <AppNavigator /> : <AuthNavigator />} cuando se implemente login
  return (
    <NavigationContainer>
      {userauth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}