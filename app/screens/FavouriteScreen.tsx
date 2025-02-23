import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    // Hàm lấy dữ liệu từ API
    const fetchFavorites = async () => {
        try {
            const resFav = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/favourites');  // API lấy danh sách yêu thích
            const favData = await resFav.json();

            const resProducts = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/products');  // API lấy danh sách sản phẩm
            const productData = await resProducts.json();

            // Ghép dữ liệu từ bảng "favourites" và "product"
            const mergedData = favData.map((fav: any) => {
                const product = productData.find((p: any) => p.id === fav.productId);
                return product ? { ...product, liked: true } : null;
            }).filter(Boolean);

            setFavorites(mergedData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý toggle yêu thích
    const toggleFavorite = (id: string) => {
        setFavorites(favorites.map(item =>
            item.id === id ? { ...item, liked: !item.liked } : item
        ));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff7f50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
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
                keyExtractor={(item) => item.id.toString()}
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
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    )}
                />  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
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
    description: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
});

