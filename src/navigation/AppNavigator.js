import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CrudCardScreen from '../screens/CrudScreen';
import AgredScreen from '../screens/AgredScreen';
import PruebaScreen from '../screens/PruebaScreen';
import PostsScreen from '../screens/PostsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  return (
    console.log("AppNavigator renderizado"),
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Prueba" component={PruebaScreen} />
      <Stack.Screen name="Crud" component={CrudCardScreen}/>
    </Stack.Navigator>
  )
}
