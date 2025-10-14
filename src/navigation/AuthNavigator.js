import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        console.log("AuthNavigator renderizado"),
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}  
            