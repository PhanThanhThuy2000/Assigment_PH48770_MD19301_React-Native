import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import LoginScreen from './login';
import SignUpScreen from './register';
import DetailScreen from './ProductDetail';
import HomeScreen from './home';
import CartScreen from './cart';
import FavouriteScreen from './favourite';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Favourite" component={FavouriteScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
