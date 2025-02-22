import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./home";
import CartScreen from "./cart";
import FavouriteScreen from "./favourite";
import OrderHistoryScreen from "./OrderHistory";

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case "Home":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "Cart":
                            iconName = focused ? "cart" : "cart-outline";
                            break;
                        case "Favourite":
                            iconName = focused ? "heart" : "heart-outline";
                            break;
                        case "OrderHistory":
                            iconName = focused ? "notifications" : "notifications-outline";
                            break;
                        default:
                            iconName = "help-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#c67d4d",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#0C0F14",
                    paddingBottom: 10,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ headerShown: false }} />
            <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
