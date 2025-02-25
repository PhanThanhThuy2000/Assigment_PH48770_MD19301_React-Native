import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const ORDER_API = "https://67b6ce1507ba6e590841d413.mockapi.io/orders";
const PRODUCT_API = "https://67b6ce1507ba6e590841d413.mockapi.io/products";
type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
};

type OrderItem = {
    id: string;
    productId: string;
    quantity: number;
    size: string;
};

type Order = {
    id: string;
    date?: string;  // Có thể undefined
    totalPrice?: number; // Có thể undefined
    items: OrderItem[];
};
export default function OrderHistoryScreen() {
    const [loading, setLoading] = useState(true);
        const [orders, setOrders] = useState<Order[]>([]);
        const [products, setProducts] = useState<Record<string, Product>>({});

    const fetchOrders = useCallback(async () => {
        try {
            const [orderRes, productRes] = await Promise.all([
                fetch(ORDER_API),
                fetch(PRODUCT_API)
            ]);

            const orderData: Order[] = await orderRes.json();
            const productData: Product[] = await productRes.json();

            // Tạo object để truy vấn sản phẩm nhanh hơn
            const productMap: Record<string, Product> = {};
            productData.forEach(prod => {
                productMap[prod.id] = prod;
            });

            setProducts(productMap);

            // Hợp nhất sản phẩm trùng lặp bằng cách tăng số lượng
            const mergedOrders: Order[] = orderData.map(order => {
                const mergedItems: Record<string, OrderItem> = {}; // Thêm kiểu dữ liệu

                order.items.forEach(item => {
                    if (mergedItems[item.productId]) {
                        mergedItems[item.productId].quantity += item.quantity;
                    } else {
                        mergedItems[item.productId] = { ...item };
                    }
                });

                return { ...order, items: Object.values(mergedItems) };
            });

            setOrders(mergedOrders);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (loading) {
        return <ActivityIndicator size="large" color="#ff7f50" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Feather name="menu" size={24} color="#fff" />
                <Text style={styles.headerText}>Order History</Text>
                <MaterialCommunityIcons name="account-circle" size={28} color="#fff" />
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderDate}>Order Date:</Text>
                            <Text style={styles.totalAmount}>
                                Total: ${item.totalPrice ? item.totalPrice.toFixed(2) : "0.00"}
                            </Text>
                        </View>
                        <Text style={styles.orderDate}>
                            {item.date ? new Date(item.date).toLocaleString() : "Unknown"}
                        </Text>

                        {item.items.map((orderItem) => {
                            const product = products[orderItem.productId] || {};
                            return (
                                <View key={orderItem.id} style={styles.itemContainer}>
                                    <Image
                                        source={{ uri: product.image || "https://via.placeholder.com/50" }}
                                        style={styles.itemImage}
                                    />
                                    <View style={styles.itemDetails}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemName}>{product.name || "Unknown Product"}</Text>
                                            <Text style={styles.itemPrice}>${product.price || "0.00"}</Text>
                                        </View>
                                        <Text style={styles.itemDesc}>{product.description || "No description available."}</Text>
                                        <View style={styles.sizeRow}>
                                            <Text style={styles.sizeText}>Size: {orderItem.size || "N/A"}</Text>
                                            <Text style={styles.quantityText}>X {orderItem.quantity || 1}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    orderCard: {
        backgroundColor: "#1e1e1e",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    orderDate: {
        color: "#aaa",
        fontSize: 14,
    },
    totalAmount: {
        color: "#ff7f50",
        fontSize: 16,
        fontWeight: "bold",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    itemDesc: {
        color: "#aaa",
        fontSize: 14,
        marginBottom: 5,
    },
    itemPrice: {
        color: "#ff7f50",
        fontSize: 16,
        fontWeight: "bold",
    },
    sizeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 5,
        marginBottom: 5,
    },
    sizeText: {
        color: "#fff",
        fontSize: 14,
    },
    quantityText: {
        color: "#fff",
        fontSize: 14,
    },
});
