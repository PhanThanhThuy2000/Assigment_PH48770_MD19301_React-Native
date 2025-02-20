import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CartScreen from './cart';
import FavouriteScreen from './favourite';
const Tab = createBottomTabNavigator();
// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Cart: undefined;
    Detail: undefined;
    Favourite: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>;

export default function CoffeeApp() {
    const [search, setSearch] = useState('');
    const coffeeCategories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [selectedCategory, setSelectedCategory] = useState('All');

    const coffeeItems = [
        { id: '1', name: 'Cappuccino', description: 'With Steamed Milk', price: '$4.20', image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg', rating: 4.5 },
        { id: '2', name: 'Cappuccino', description: 'With Foam', price: '$4.20', image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg', rating: 4.2 },

    ];
    const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
            <ScrollView style={styles.container}>


                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('@/assets/images/menu.png')}
                            style={styles.logo}
                        />
                        <TouchableOpacity>
                            <MaterialIcons name="account-circle" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container}>
                    <View >
                        <Text style={styles.title}>Find the best </Text>
                        <Text style={styles.title2}>coffee for you</Text>
                    </View>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Find Your Coffee..."
                            placeholderTextColor="#aaa"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>

                    {/* Categories */}
                    <FlatList
                        data={coffeeCategories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.categoryButton]}
                                onPress={() => setSelectedCategory(item)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === item && styles.selectedCategoryText,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    {/* Coffee Items */}
                    <FlatList
                        data={coffeeItems}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <View style={styles.coffeeCard}>
                                <Image source={{ uri: item.image }} style={styles.coffeeImage} />

                                {item.rating && (
                                    <View style={styles.ratingBadge}>
                                        <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                )}

                                <Text style={styles.coffeeName}>{item.name}</Text>
                                <Text style={styles.coffeeDescription}>{item.description}</Text>
                                <Text style={styles.coffeePrice}>{item.price}</Text>

                                <TouchableOpacity style={styles.addButton}>
                                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        )}
                    />
                    <View >
                        <Text style={styles.title3}>coffee beans</Text>
                    </View>
                    <FlatList
                        data={coffeeItems}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <View style={styles.coffeeCard}>
                                <Image source={{ uri: item.image }} style={styles.coffeeImage} />

                                {item.rating && (
                                    <View style={styles.ratingBadge}>
                                        <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                )}

                                <Text style={styles.coffeeName}>{item.name}</Text>
                                <Text style={styles.coffeeDescription}>{item.description}</Text>
                                <Text style={styles.coffeePrice}>{item.price}</Text>

                                <TouchableOpacity style={styles.addButton}>
                                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        )}
                    />


                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Home')}>
                    <Image source={require('../assets/images/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Cart')}>
                    <Image source={require('../assets/images/bag-2.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Favourite')}>
                    <Image source={require('../assets/images/tym.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/images/noti.png')} />
                </TouchableOpacity>
            </View>
            {/* <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'home';
                            } else if (route.name === 'Cart') {
                                iconName = 'shopping-cart';
                            } else if (route.name === 'Favourite') {
                                iconName = 'favorite';
                            }

                            return <MaterialIcons size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#c67d4d',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: { backgroundColor: '#0C0F14' },
                    })}
                >
                    <Tab.Screen name="Home" component={CoffeeApp} />
                    <Tab.Screen name="Cart" component={CartScreen} />
                    <Tab.Screen name="Favourite" component={FavouriteScreen} />
                </Tab.Navigator>
            </NavigationContainer> */}
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1a',
        padding: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    title3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 15,
    },
    searchBar: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 10,
        color: '#fff',
        marginBottom: 15,
    },
    categoryButton: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    categoryText: {
        color: '#34363a',
    },
    selectedCategoryText: {
        color: '#c67d4d',
    },
    // coffeeCard: {
    //   flex: 1,
    //   margin: 5,
    //   backgroundColor: '#333',
    //   borderRadius: 10,
    //   padding: 10,
    //   alignItems: 'center',
    //   position: 'relative',
    // },
    coffeeImage: {
        width: 140,
        height: 140,
        borderRadius: 15,
        marginBottom: 10,
    },
    coffeeName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    coffeeDescription: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 10,
    },
    coffeePrice: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#d97941',
        borderRadius: 10,
        padding: 5,
    },
    ratingContainer: {
        position: 'absolute',
        top: 10,
        right: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    // ratingText: {
    //   color: '#fff',
    //   fontSize: 12,
    //   marginLeft: 5,
    // },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#333',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    coffeeCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        padding: 10,
        position: 'relative',
        elevation: 4, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    ratingBadge: {
        position: 'absolute',
        top: 10,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
        paddingHorizontal: 7,
        paddingVertical: 3,
        shadowColor: '#000', // Shadow for iOS
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0C0F14',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#0C0F14',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navIcon: {
        fontSize: 24,
        color: '#fff',
    },

});



