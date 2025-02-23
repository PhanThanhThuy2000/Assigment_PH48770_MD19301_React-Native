import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, ActivityIndicator, Alert } from 'react-native';
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
    ProductDetail: { item: product };
    Favourite: undefined;
};
type ProductDetailScreenNavigationProp = StackNavigationProp<RootParamList, 'ProductDetail'>;

type product = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    categoryId: string;
    size: string;
};

export default function ProductDetail({ route }: { route: any }) {
    const navigation = useNavigation<ProductDetailScreenNavigationProp>();
    const { item } = route.params;
    const [selectedSize, setSelectedSize] = useState('250gm');
    const [isFavorite, setIsFavorite] = useState(false);
    const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    // 🧡 Thêm sản phẩm vào danh sách yêu thích
    const addToFavorites = async () => {
        try {
            const response = await fetch('http://your-backend-url.com/favourites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: item.id, userId: 'USER_ID' }) // Thay 'USER_ID' bằng ID người dùng thật
            });

            if (response.ok) {
                setIsFavorite(true);
                Alert.alert('Thành công', 'Đã thêm vào danh sách yêu thích!');
            } else {
                Alert.alert('Lỗi', 'Không thể thêm vào danh sách yêu thích.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào danh sách yêu thích:', error);
        }
    };

    // 🛒 Thêm sản phẩm vào giỏ hàng
    const addToCart = async () => {
        try {
            const response = await fetch('http://your-backend-url.com/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: item.id,
                    userId: 'USER_ID', // Thay 'USER_ID' bằng ID thực của người dùng
                    size: selectedSize,
                    quantity: 1
                })
            });

            if (response.ok) {
                Alert.alert('Thành công', 'Đã thêm vào giỏ hàng!');
            } else {
                Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
            <ScrollView style={styles.container}>
                <View style={styles.coffeeCard}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addToFavorites}>
                            <MaterialCommunityIcons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.ratingBadge}>
                        <View style={styles.ratingBadge2}>
                            <Text style={styles.tagText}>{item.name}</Text>
                            <Text style={styles.tagText2}>{item.description}</Text>
                            <View style={styles.ratingContainer}>
                                <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Size</Text>
                    <View style={styles.sizeContainer}>
                        {['250gm', '500gm', '1000gm'].map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
                        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a1a' },
    safeArea: { flex: 1, backgroundColor: 'white' },
    productImage: { width: '100%', height: 400, resizeMode: 'cover' },
    infoContainer: { padding: 20 },
    tagText: { color: '#fff', fontSize: 16, marginLeft: 5, fontWeight: 'bold' },
    tagText2: { color: '#fff', fontSize: 12, marginLeft: 5, opacity: 0.5 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    ratingText: { color: '#fff', fontSize: 16, marginLeft: 5, fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginVertical: 10 },
    sizeContainer: { flexDirection: 'row', marginBottom: 20 },
    sizeOption: { borderWidth: 1, borderColor: '#aaa', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15, marginRight: 10 },
    selectedSizeOption: { backgroundColor: '#d97941', borderColor: '#d97941' },
    sizeText: { color: '#aaa' },
    selectedSizeText: { color: '#fff' },
    priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    price: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    addToCartButton: { backgroundColor: '#d97941', borderRadius: 15, paddingVertical: 10, paddingHorizontal: 50 },
    addToCartText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    coffeeCard: { flex: 1, position: 'relative', elevation: 4 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, position: 'absolute', top: 10, width: '100%', zIndex: 1 },
    ratingBadge: { bottom: 0, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingHorizontal: 190, paddingVertical: 80 },
    ratingBadge2: { paddingHorizontal: 10, position: 'absolute', bottom: 0 },
});