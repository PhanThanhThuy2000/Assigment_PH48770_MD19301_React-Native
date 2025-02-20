import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
type RootParamList = {
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
    
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Cappuccino', description: 'With Steamed Milk', size: ['S', 'M', 'L'], prices: [4.20, 4.20, 4.20], quantity: [1, 1, 1], image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg' },
        { id: '2', name: 'Cappuccino', description: 'With Steamed Milk', size: ['M'], prices: [6.20], quantity: [1], image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg' },
        { id: '3', name: 'Robusta Beans', description: 'From Africa', size: ['250gr'], prices: [6.20], quantity: [1], image: 'https://anhungcoffee.com/wp-content/uploads/2019/10/image2.jpg' },
    ]);

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (itemIndex: number, sizeIndex: number, change: number) => {
        const newCart = [...cartItems];
        newCart[itemIndex].quantity[sizeIndex] = Math.max(1, newCart[itemIndex].quantity[sizeIndex] + change);
        setCartItems(newCart);
    };

    // Tính tổng giá
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.prices.reduce((sum, price, idx) => sum + price * item.quantity[idx], 0);
    }, 0);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Cart</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="account-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Danh sách sản phẩm */}
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                {item.size.map((size, sizeIdx) => (
                                    <View key={sizeIdx} style={styles.sizeRow}>
                                        <Text style={styles.sizeText}>{size}</Text>
                                        <Text style={styles.priceText}>${item.prices[sizeIdx].toFixed(2)}</Text>
                                        <View style={styles.quantityContainer}>
                                            <TouchableOpacity onPress={() => updateQuantity(index, sizeIdx, -1)}>
                                                <MaterialCommunityIcons name="minus-box" size={24} color="#ff7f50" />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{item.quantity[sizeIdx]}</Text>
                                            <TouchableOpacity onPress={() => updateQuantity(index, sizeIdx, 1)}>
                                                <MaterialCommunityIcons name="plus-box" size={24} color="#ff7f50" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                />

                {/* Tổng tiền */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Price</Text>
                    <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                </View>

                {/* Nút thanh toán */}
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payText}>Pay</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation */}
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
