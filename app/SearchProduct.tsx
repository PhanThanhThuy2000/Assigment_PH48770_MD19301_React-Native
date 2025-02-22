import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootParamList = {
    Home: undefined;
    Search: undefined;
    Detail: { id: string };
};

type SearchScreenNavigationProp = StackNavigationProp<RootParamList, 'Search'>;

type CoffeeItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
};

export default function SearchProduct() {
    const navigation = useNavigation<SearchScreenNavigationProp>();
    const [search, setSearch] = useState('');
    const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<CoffeeItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoffeeData = async () => {
            try {
                const response = await fetch('https://67b6ce1507ba6e590841d413.mockapi.io/products');
                const data: CoffeeItem[] = await response.json();
                setCoffeeItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('Error fetching coffee data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoffeeData();
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredItems(coffeeItems);
        } else {
            const filtered = coffeeItems.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [search, coffeeItems]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#aaa" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for coffee..."
                    placeholderTextColor="#aaa"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#c67d4d" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.coffeeCard}
                            onPress={() => navigation.navigate('Detail', { id: item.id })}
                        >
                            <Image source={{ uri: item.image }} style={styles.coffeeImage} />
                            <View>
                                <Text style={styles.coffeeName}>{item.name}</Text>
                                <Text style={styles.coffeePrice}>${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a1a', padding: 10 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, color: '#fff', fontSize: 16 },
    coffeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    coffeeImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
    coffeeName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    coffeePrice: { color: '#c67d4d', fontSize: 14 },
});
