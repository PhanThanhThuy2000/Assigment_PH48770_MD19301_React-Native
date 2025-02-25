import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
type RootParamList = {
    Payment: { totalPrice: number };
    App: undefined;
};

type PaymentScreenRouteProp = RouteProp<RootParamList, 'Payment'>;

export default function PaymentScreen() {
    const route = useRoute<PaymentScreenRouteProp>(); // truyền param
    const navigation = useNavigation<NavigationProp<RootParamList>>(); // điều hướng
    const { totalPrice } = route.params || { totalPrice: 0 };

    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("https://67b6ce1507ba6e590841d413.mockapi.io/cart");
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Lỗi khi tải giỏ hàng:", error);
            }
        };
        fetchCartItems();
    }, []);

    const handlePayment = async () => {
        if (cartItems.length === 0) {
            Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống!");
            return;
        }

        try {
            // Gửi đơn hàng lên MockAPI
            await fetch("https://67b6ce1507ba6e590841d413.mockapi.io/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems,
                    totalPrice,
                    date: new Date().toISOString(),
                }),
            });

            // Xóa giỏ hàng sau khi thanh toán thành công
            for (const item of cartItems) {
                await fetch(`https://67b6ce1507ba6e590841d413.mockapi.io/cart/${item.id}`, {
                    method: "DELETE",
                });
            }

            Alert.alert("Thanh toán thành công");
            navigation.navigate("App"); // Điều hướng về trang chủ
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            Alert.alert("Lỗi", "Thanh toán không thành công, vui lòng thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment</Text>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons name="credit-card-outline" size={24} color="#fff" />
                    <Text style={styles.cardBrand}>VISA</Text>
                </View>
                <Text style={styles.cardNumber}>3897  8923  6745  4638</Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardHolder}>Robert Evans</Text>
                    <Text style={styles.expiry}>02/30</Text>
                </View>
            </View>
 {/* Payment Options */}
            <TouchableOpacity style={styles.paymentOption}>
                <MaterialCommunityIcons name="wallet" size={24} color="#ff7f50" />
                <Text style={styles.paymentText}>Wallet</Text>
                <Text style={styles.paymentAmount}>$100.50</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption}>
                <FontAwesome name="google" size={24} color="#fff" />
                <Text style={styles.paymentText}>Google Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption}>
                <FontAwesome name="apple" size={24} color="#fff" />
                <Text style={styles.paymentText}>Apple Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption}>
                <MaterialCommunityIcons name="amazon" size={24} color="#fff" />
                <Text style={styles.paymentText}>Amazon Pay</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                    <Text style={styles.payButtonText}>Pay from Credit Card</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ff7f50",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    cardBrand: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 3,
        color: "#fff",
        marginBottom: 10,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardHolder: {
        color: "#aaa",
        fontSize: 14,
    },
    expiry: {
        color: "#aaa",
        fontSize: 14,
    },
    footer: {
        marginTop: 20,
    },
    totalText: {
        fontSize: 20,
        color: '#ff7f50',
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: "#ff7f50",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    payButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
   
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    paymentText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
    },
    paymentAmount: {
        color: "#ff7f50",
        fontSize: 16,
        marginLeft: "auto",
    }
});
