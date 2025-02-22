import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderHistory() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông bao đơn hàng</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#0C0F14', // Màu nền tối
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Màu chữ trắng
    },
});

