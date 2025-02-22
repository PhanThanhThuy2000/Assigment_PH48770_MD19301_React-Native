import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import LoginScreen from './login';
import SignUpScreen from './Register';
import DetailScreen from './ProductDetail';
import HomeScreen from './home';
import CartScreen from './cart';
import FavouriteScreen from './favourite';
import SettingScreen from './setting';
import OrderHistoryScreen from './OrderHistory';
import EditAccountScreen from './editAccount';
import AppScreen from './app';
import AdminScreen from './admin';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={DetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Favourite" component={FavouriteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditAccount" component={EditAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
