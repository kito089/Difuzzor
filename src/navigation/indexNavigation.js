import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useSession } from "../utils/SessionContext";

export default function IndexNavigation() {
  const { userinfo } = useSession();
  return (
    <NavigationContainer>
      {userinfo ? <AppNavigator /> : <AuthNavigator />} 
    </NavigationContainer>
  );
}