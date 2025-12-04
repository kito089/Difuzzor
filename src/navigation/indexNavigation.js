import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useSession } from "../utils/SessionContext";

export default function IndexNavigation() {
  const { userauth } = useSession();
  return (
    <NavigationContainer>
      {userauth ? <AppNavigator /> : <AuthNavigator />} 
    </NavigationContainer>
  );
}