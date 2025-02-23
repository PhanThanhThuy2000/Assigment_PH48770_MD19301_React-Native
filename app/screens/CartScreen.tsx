import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootParamList = {
    App: undefined;
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Cart: undefined;
    Detail: undefined;
    Favourite: undefined;
};
type CartScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>;

export default function CartScreen() {
    const navigation = useNavigation<CartScreenNavigationProp>();

    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartResponse = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/cart');
                const cartData = await cartResponse.json();

                console.log("Dữ liệu cart:", cartData); // Kiểm tra dữ liệu từ API

                if (!Array.isArray(cartData)) {
                    throw new Error("Dữ liệu cart không phải là một mảng!");
                }
                if (!cartData || !Array.isArray(cartData)) {
                    console.error("Dữ liệu giỏ hàng không hợp lệ:", cartData);
                    return;
                }
                const productResponse = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/products');
                const productData = await productResponse.json();

                console.log("Dữ liệu sản phẩm:", productData); // Kiểm tra dữ liệu sản phẩm

                if (!Array.isArray(productData)) {
                    throw new Error("Dữ liệu sản phẩm không phải là một mảng!");
                }

                const updatedCart = cartData.map((cartItem: any) => {
                    const product = productData.find((p: any) => p.id === cartItem.productId);
                    return product ? {
                        ...product,
                        quantity: cartItem.quantity,
                        size: cartItem.size  // Giữ nguyên size từ API giỏ hàng
                    } : null;
                }).filter(Boolean);

                // const updatedCart = cartData.map((cartItem: any) => {
                //     const product = productData.find((p: any) => p.id === cartItem.productId);
                //     return product ? { ...product, quantity: cartItem.quantity, size: cartItem.size } : null;
                // }).filter(Boolean);

                setCartItems(updatedCart);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchCartData();
    }, []);

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (index: number, change: number) => {
        const newCart = [...cartItems];
        newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
        setCartItems(newCart);
    };

    // Tính tổng giá
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Cart</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="account-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Kiểm tra loading */}
                {loading ? (
                    <ActivityIndicator size="large" color="#ff7f50" />
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                    <View style={styles.sizeRow}>
                                        <Text style={styles.sizeText}>{item.size}</Text>
                                        <Text style={styles.priceText}>${item.price}</Text>
                                        <View style={styles.quantityContainer}>
                                            <TouchableOpacity onPress={() => updateQuantity(index, -1)}>
                                                <MaterialCommunityIcons name="minus-box" size={24} color="#ff7f50" />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{item.quantity}</Text>
                                            <TouchableOpacity onPress={() => updateQuantity(index, 1)}>
                                                <MaterialCommunityIcons name="plus-box" size={24} color="#ff7f50" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                )}

                {/* Tổng tiền */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Price</Text>
                    <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                </View>

                {/* Nút thanh toán */}
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payText}>Pay</Text>
                </TouchableOpacity>
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
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemDescription: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 10,
    },
    sizeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    sizeText: {
        fontSize: 14,
        color: '#fff',
        width: 30,
    },
    priceText: {
        fontSize: 14,
        color: '#ff7f50',
        fontWeight: 'bold',
        width: 50,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 14,
        color: '#fff',
        marginHorizontal: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#333',
    },
    totalText: {
        fontSize: 18,
        color: '#aaa',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff7f50',
    },
    payButton: {
        backgroundColor: '#ff7f50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    payText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

