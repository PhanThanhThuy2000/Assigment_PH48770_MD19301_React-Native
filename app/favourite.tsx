import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Cart: undefined;
    Detail: undefined;
    Favourite: undefined;
};
type FavouriteScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>;
export default function FavoritesScreen() {
    const navigation = useNavigation<FavouriteScreenNavigationProp>();
    
    const [favorites, setFavorites] = useState([
        {
            id: '1',
            name: 'Cappuccino',
            description: 'With Steamed Milk',
            rating: 4.5,
            image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg',
            tags: ['Coffee', 'Milk', 'Medium Roasted'],
            liked: true
        },
        {
            id: '2',
            name: 'Latte',
            description: 'Smooth and Creamy',
            rating: 4.7,
            image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg',
            tags: ['Coffee', 'Milk', 'Light Roasted'],
            liked: true
        }
    ]);

    // Xử lý toggle yêu thích
    const toggleFavorite = (id: string) => {
        setFavorites(favorites.map(item =>
            item.id === id ? { ...item, liked: !item.liked } : item
        ));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Favorites</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="account-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Danh sách yêu thích */}
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.favoriteItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)}>
                                <MaterialCommunityIcons name={item.liked ? "heart" : "heart-outline"} size={24} color="red" />
                            </TouchableOpacity>

                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                <View style={styles.ratingContainer}>
                                    <MaterialCommunityIcons name="star" size={16} color="#ffcc00" />
                                    <Text style={styles.ratingText}>{item.rating} Rating</Text>
                                </View>

                                {/* Tags */}
                                <View style={styles.tagContainer}>
                                    {item.tags.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Mô tả */}
                                <Text style={styles.description}>
                                    Cappuccino is a taste made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
              {/* Bottom Navigation */}
                {/* <View style={styles.bottomNavigation}>
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
                </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    favoriteItem: {
        backgroundColor: '#1e1e1e',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
    },
    itemImage: {
        width: '100%',
        height: 180,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 5,
    },
    itemDetails: {
        padding: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemDescription: {
        fontSize: 14,
        color: '#aaa',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#ffcc00',
        marginLeft: 5,
    },
    tagContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#ff7f50',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginRight: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#fff',
    },
    description: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 5,
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
    }
});

