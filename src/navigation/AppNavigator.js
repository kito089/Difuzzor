import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CrudCardScreen from '../screens/CrudScreen';
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  return (
    console.log("AppNavigator renderizado"),
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Crud" component={CrudCardScreen}/>
    </Stack.Navigator>
  )
}
