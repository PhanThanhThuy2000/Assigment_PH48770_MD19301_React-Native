import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Platform
} from 'react-native';
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
    Setting: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>;

type product = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    categoryId: string;
};

type Category = {
    id: string;
    name: string;
};

export default function CoffeeApp() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setproducts] = useState<product[]>([]);
    const [filteredItems, setFilteredItems] = useState<product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let filtered = products;

        // Lọc theo danh mục
        if (selectedCategory.toLowerCase() !== 'all') {
            filtered = filtered.filter(item =>
                item.categoryId.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Lọc theo từ khóa tìm kiếm
        if (search.trim() !== '') {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [search, selectedCategory, products]);


    useEffect(() => {
        const fetchCoffeeData = async () => {
            try {
                const response = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/products');
                const data: product[] = await response.json();
                setproducts(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/categories');
                const data: Category[] = await response.json();
                setCategories([{ id: 'all', name: 'All' }, ...data]);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };

        fetchCoffeeData();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory.toLowerCase() === 'all') {
            setFilteredItems(products);
        } else {
            const filtered = products.filter(item => {
                console.log(`Checking item ${item.name}:`, item.categoryId);
                return item.categoryId.toLowerCase() === selectedCategory.toLowerCase();
            });
            setFilteredItems(filtered);
        }
    }, [selectedCategory, products]);

    return (
        <SafeAreaView style={[styles.safeArea]}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.replace('Setting')}>
                        <MaterialIcons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="account-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Find the best coffee for you</Text>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
                    <TextInput

                        placeholder="Find Your Coffee..."
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={<View style={{ height: 38 }} />} // Tạo khoảng trống ở cuối danh sách
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[
                                styles.categoryButton,
                                selectedCategory === item.id && styles.selectedCategory
                            ]}
                            onPress={() => setSelectedCategory(item.id)} // Lưu ID danh mục thay vì name
                        >
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />


                {loading ? (
                    <ActivityIndicator size="large" color="#c67d4d" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={filteredItems}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.coffeeCard}
                                onPress={() => navigation.navigate('ProductDetail', { item })} // Chuyển dữ liệu sang màn hình ProductDetail
                            >
                                <Image source={{ uri: item.image }} style={styles.coffeeImage} />
                                <Text style={styles.coffeeName}>{item.name}</Text>
                                <Text style={styles.coffeeDescription}>{item.description}</Text>
                                <Text style={styles.coffeePrice}>${item.price}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />

                )}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#1a1a1a', padding: 10 },
        safeArea: {
            flex: 1,
            backgroundColor: '#1a1a1a',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    searchIcon: { marginRight: 10 },
    categoryButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#2a2a2a'
    },
    selectedCategory: { backgroundColor: '#c67d4d' },
    categoryText: {
        color: '#fff',
    },
    coffeeCard: {
        flex: 1,
        marginBottom: 10,
        margin: 5,
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        padding: 10,
        position: 'relative',
        elevation: 4
    },
    coffeeImage: { width: 140, height: 140, borderRadius: 15, marginBottom: 10 },
    coffeeName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    coffeeDescription: { color: '#aaa', fontSize: 12, marginBottom: 10 },
    coffeePrice: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
    addButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#d97941', borderRadius: 10, padding: 5 }
    ,
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
