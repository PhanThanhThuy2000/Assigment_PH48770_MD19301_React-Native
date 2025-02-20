import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState('250gm');
    const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const icons = [
        { name: 'coffee', label: 'Bean' },
        { name: 'map-marker', label: 'Africa' },
        { name: 'fire', label: 'Medium Roasted' },
    ];
    return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
        <ScrollView style={styles.container}>
            
                <View style={styles.coffeeCard}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <TouchableOpacity >
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <MaterialCommunityIcons name="heart-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    {/* Product Image */}
                    <Image
                        source={require('@/assets/images/chi_tiet_san_pham.jpg')}
                        style={styles.productImage}
                    />
                    <View style={styles.ratingBadge}>
                        <View style={styles.ratingBadge2}>

                            <Text style={styles.tagText}>Robusta Beans</Text>
                            <Text style={styles.tagText2}>From Africk</Text>
                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
                            <Text style={styles.ratingText}>4.5</Text>
                            <Text style={styles.ratingText2}>(6,879)</Text>
                            </View>
                        </View>

                    </View>
                </View>
                    
            {/* Product Info */}
            <View style={styles.infoContainer}>
                

                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    Arabica beans are by far the most popular type of coffee beans, making up about 60% of the
                    world's coffee. These tasty beans originated many centuries ago in the highlands of Ethiopia,
                    and may even be the first coffee beans ever consumed!
                </Text>

                {/* Size Selection */}
                <Text style={styles.sectionTitle}>Size</Text>
                <View style={styles.sizeContainer}>
                    {['250gm', '500gm', '1000gm'].map((size) => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeOption,
                                selectedSize === size && styles.selectedSizeOption,
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text
                                style={[
                                    styles.sizeText,
                                    selectedSize === size && styles.selectedSizeText,
                                ]}
                            >
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Price and Add to Cart */}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>$10.50</Text>
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    heart: {
        color: '#000',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
   
    productImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    productOrigin: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 15,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    tagText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
        bottom: 10
    },
    tagText2: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 5,
        opacity: 0.5,
        bottom:10
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    ratingText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
        fontWeight:'bold'
    },
    ratingText2: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 5,
        opacity:0.5
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 20,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    sizeOption: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    selectedSizeOption: {
        backgroundColor: '#d97941',
        borderColor: '#d97941',
    },
    sizeText: {
        color: '#aaa',
    },
    selectedSizeText: {
        color: '#fff',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    addToCartButton: {
        backgroundColor: '#d97941',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
  
    coffeeCard: {
        flex: 1,
        position: 'relative',
        elevation: 4, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    header: {
        flexDirection: 'row', // Align back and heart icons horizontally
        justifyContent: 'space-between', // Space out the icons
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: 'absolute',
        top: 10, // Position it near the top
        width: '100%', // Ensure it spans the width
        zIndex: 1, // Ensure it appears above other elements
    },

    ratingBadge: {
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
        paddingHorizontal: 190,
        paddingVertical: 80,
    },
    ratingBadge2: {
        paddingHorizontal : 10,
        position: 'absolute',
        bottom: 0,
    },
});

