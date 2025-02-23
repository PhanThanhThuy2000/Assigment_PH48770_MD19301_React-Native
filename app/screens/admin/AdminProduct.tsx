import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
    StyleSheet,
    Alert,
    Image,
} from "react-native";
import axios from "axios";

const API_URL = "https://67b6ce1507ba6e590841d413.mockapi.io/products";

interface Product {
    id?: string; // Đổi từ number -> string
    name: string;
    price: string;
    description: string;
    image: string;
    size: string;
    categoryId: string;
}


const AdminProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productData, setProductData] = useState<Product>({
        name: "",
        price: "",
        description: "",
        image: "",
        size: "",
        categoryId: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (product: Product | null = null) => {
        if (product) {
            setEditingProduct(product);
            setProductData({ ...product });
        } else {
            setEditingProduct(null);
            setProductData({ name: "", price: "", description: "", image: "", size: "", categoryId: "" });
        }
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!productData.name || !productData.price) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        try {
            if (editingProduct) {
                const response = await axios.put(`${API_URL}/${editingProduct.id}`, productData);
                setProducts(products.map(p => (p.id === editingProduct.id ? response.data : p)));
            } else {
                const response = await axios.post(API_URL, productData);
                setProducts([...products, response.data]);
            }
            setModalVisible(false);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleDeleteProduct = (id: string) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa sản phẩm này không?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: async () => {
                    try {
                        await axios.delete(`${API_URL}/${id}`);
                        setProducts(products.filter(p => p.id !== id));
                    } catch (error) {
                        console.error("API Error:", error);
                    }
                },
                style: "destructive",
            },
        ]);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản lý sản phẩm</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id?.toString() || ""}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price} VNĐ</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleOpenDialog(item)}>
                                <Text style={styles.buttonText}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.id!)}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => handleOpenDialog()}>
                <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</Text>
                        {Object.keys(productData).map((key) => {
                            const typedKey = key as keyof Product;
                            return (
                                <TextInput
                                    key={key}
                                    style={styles.input}
                                    value={productData[typedKey] ? productData[typedKey].toString() : ""}
                                    onChangeText={(text) => setProductData({ ...productData, [typedKey]: text })}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                />
                            );
                        })}

                        <Button title="Lưu" onPress={handleSave} />
                        <Button title="Hủy" color="red" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
    productItem: { flexDirection: "row", backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 10 },
    productImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
    productInfo: { flex: 6 },
    name: { fontSize: 18, fontWeight: "bold" },
    price: { fontSize: 16, fontWeight: "bold", color: "#28a745" },
    description: { fontSize: 14, color: "#555", marginTop: 5 },
    actions: { flex: 4, flexDirection: "row", justifyContent: "space-between" },
    editButton: { backgroundColor: "#FFA500", padding: 8, borderRadius: 5 },
    deleteButton: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    addButton: { backgroundColor: "#008000", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
    addButtonText: { color: "#fff", fontWeight: "bold" },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, width: "100%" },
});

export default AdminProduct;
