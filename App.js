import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import PlantsScreen from './screens/PlantsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SignOutScreen from './screens/SignOutScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isLoggedIn ? (
        <MainTabNavigator 
          onSignOut={() => setIsLoggedIn(false)} 
          favorites={favorites} 
          setFavorites={setFavorites} 
        />
      ) : (
        <Stack.Navigator initialRouteName="Sign In">
          <Stack.Screen 
            name="Sign In" 
            options={{ headerShown: false }} 
          >
            {(props) => (
              <SignInScreen {...props} onSignIn={() => setIsLoggedIn(true)} />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="Sign Up" 
            component={SignUpScreen} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MainTabNavigator = ({ onSignOut, favorites, setFavorites }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Plants') {
            iconName = 'leaf';
          } else if (route.name === 'Schedule') {
            iconName = 'tint';
          } else if (route.name === 'Contact') {
            iconName = 'envelope';
          } else if (route.name === 'Sign Out') {
            iconName = 'sign-out';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: route.name === 'Sign Out' ? 'none' : 'flex',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Plants">
        {(props) => (
          <PlantsScreen {...props} favorites={favorites} setFavorites={setFavorites} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Schedule">
        {(props) => (
          <FavoritesScreen {...props} favorites={favorites} setFavorites={setFavorites} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen 
        name="Sign Out" 
        options={{ headerShown: false }} 
      >
        {(props) => (
          <SignOutScreen {...props} onSignOut={onSignOut} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default App;
