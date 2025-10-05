import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MarketScreen from '../screens/MarketScreen';
import ProfileScreen from '../screens/ProfileScreen';

import gato from '../../assets/gato.png';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente del Header personalizado
function CustomHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image 
          source={gato} 
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Difuzzor</Text>
      </View>
      
      <TouchableOpacity style={styles.headerRight}>
        <View style={styles.headerIconPlaceholder} />
      </TouchableOpacity>
    </View>
  );
}

// Componente de tabs para las pantallas con footer
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0E86DB',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Tienda.png')}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.6 }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Home.png')}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.6 }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/defaultavatar.png')}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.6 }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16232C',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 12 : 12,
    paddingBottom: 12,
    minHeight: 70,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  headerIconPlaceholder: {
    width: 30,
    height: 30,
  },
  
  // Tab bar styles
  tabBar: {
    backgroundColor: '#22323D',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabIcon: {
    width: 50,
    height: 50,
  },
});