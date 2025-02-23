import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/RegisterScreen';
import DetailScreen from './screens/ProductDetailScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import SettingScreen from './screens/SettingScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import AppScreen from './app';
import AdminScreen from './screens/admin/AdminProduct';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
