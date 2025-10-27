import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CrudScreen from '../screens/CrudScreen';
import AgredScreen from '../screens/AgredScreen';

import PruebaScreen from '../screens/PruebaScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  return (
    console.log("AppNavigator renderizado"),
    <Stack.Navigator initialRouteName="Clubs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Prueba" component={PruebaScreen} />
      <Stack.Screen name="Crud" component={CrudScreen} />
      <Stack.Screen name="Agred" component={AgredScreen} />
    </Stack.Navigator>
  )
}