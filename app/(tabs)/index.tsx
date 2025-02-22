import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, ScrollView,
  Image, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type CoffeeItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  category?: string; // Thêm dấu ? vì có thể API không có category
};

export default function CoffeeApp() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const coffeeCategories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const response = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/products');
        const data: CoffeeItem[] = await response.json();
        console.log(data); // Debug API response
        setCoffeeItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoffeeData();
  }, []);

  // Lọc sản phẩm khi chọn danh mục
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(coffeeItems);
    } else {
      const filtered = coffeeItems.filter(item => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [selectedCategory, coffeeItems]);

  const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Find the best coffee for you</Text>
          {/* Thanh tìm kiếm */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
            <TextInput
              placeholder="Find Your Coffee..."
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Danh mục */}
          <FlatList
            data={coffeeCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Hiển thị loading */}
          {loading ? (
            <ActivityIndicator size="large" color="#c67d4d" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={filteredItems}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.coffeeCard}>
                  <Image source={{ uri: item.image }} style={styles.coffeeImage} />
                  <Text style={styles.coffeeName}>{item.name}</Text>
                  <Text style={styles.coffeeDescription}>{item.description}</Text>
                  <Text style={styles.coffeePrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1a1a1a', padding: 10 },
  safeArea: { flex: 1, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
  searchIcon: { marginRight: 10 },
  categoryButton: { marginRight: 10, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#2a2a2a' },
  selectedCategory: { backgroundColor: '#c67d4d' },
  categoryText: { color: '#fff' },
  coffeeCard: { flex: 1, margin: 5, backgroundColor: '#2a2a2a', borderRadius: 15, padding: 10, position: 'relative', elevation: 4 },
  coffeeImage: { width: 140, height: 140, borderRadius: 15, marginBottom: 10 },
  coffeeName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  coffeeDescription: { color: '#aaa', fontSize: 12, marginBottom: 10 },
  coffeePrice: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  addButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#d97941', borderRadius: 10, padding: 5 },
});
