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
import axios, { AxiosError } from "axios";
import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
const API_URL = "https://67b6ce1507ba6e590841d413.mockapi.io/products";
const CATEGORY_API_URL = "https://67b6ce1507ba6e590841d413.mockapi.io/categories";

type Product = {
    id?: string;
    name: string;
    price: string;
    description: string;
    image: string;
    size: string;
    categoryId: string;
};

type Category = {
    id: string;
    name: string;
};

const AdminProductScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
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
        fetchData();
        fetchCategories();
    }, []);

    // Lấy danh sách sản phẩm từ API
    const fetchData = async () => {
        try {
            const response = await axios.get<Product[]>(API_URL);
            setProducts(response.data);
        } catch (error) {
            console.error("Lỗi API:", error);
        } finally {
            setLoading(false);
        }
    };

    // Lấy danh mục sản phẩm từ API
    const fetchCategories = async () => {
        try {
            const response = await axios.get<Category[]>(CATEGORY_API_URL);
            setCategories(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
        }
    };

    const handleImagePick = async () => {
        console.error("Lỗi khi lấy danh mục:");
        // Yêu cầu quyền truy cập thư viện ảnh
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       

        if (status !== "granted") {
            Alert.alert("Lỗi", "Ứng dụng cần quyền truy cập ảnh để chọn ảnh!");
            return;
        }

        // Mở thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Vẫn hoạt động
            allowsEditing: true,
            quality: 1,
        });




        if (!result.canceled) {
            setProductData({ ...productData, image: result.assets[0].uri });
        }
    };



    // Mở modal (chỉnh sửa hoặc thêm mới)
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

    // Lưu sản phẩm (Thêm mới hoặc chỉnh sửa)
    const handleSave = async () => {
        if (!productData.name || !productData.price || !productData.categoryId) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        try {
            if (editingProduct) {
                await axios.put(`${API_URL}/${editingProduct.id}`, productData);
            } else {
                await axios.post(API_URL, productData);
            }
            fetchData(); // Cập nhật danh sách sau khi lưu
            setModalVisible(false);
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản lý sản phẩm</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleOpenDialog()}>
                <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</Text>
                        <TextInput
                            style={styles.input}
                            value={productData.name}
                            onChangeText={(text) => setProductData({ ...productData, name: text })}
                            placeholder="Tên sản phẩm"
                        />
                        <TextInput
                            style={styles.input}
                            value={productData.price}
                            onChangeText={(text) => setProductData({ ...productData, price: text })}
                            placeholder="Giá sản phẩm"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={productData.description}
                            onChangeText={(text) => setProductData({ ...productData, description: text })}
                            placeholder="Mô tả sản phẩm"
                        />
                        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
                            <Text style={styles.buttonText}>Chọn ảnh</Text>
                        </TouchableOpacity>
                        {productData.image ? <Image source={{ uri: productData.image }} style={styles.productImage} /> : null}
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
    addButton: { backgroundColor: "#008000", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
    addButtonText: { color: "#fff", fontWeight: "bold" },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, width: "100%" },
    imagePickerButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    productImage: { width: 100, height: 100, borderRadius: 10, marginTop: 10 },
});

export default AdminProductScreen;