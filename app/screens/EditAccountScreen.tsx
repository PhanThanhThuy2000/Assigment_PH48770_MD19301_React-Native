import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://67b6ce1507ba6e590841d413.mockapi.io/users'; // MockAPI URL

export default function SettingScreen() {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('1'); // Replace with dynamic user ID
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_URL}/${userId}`);
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch user data');
        }
    };

    const handleUpdate = async () => {
        if (!name || !email) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        if (password !== retypePassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const updatedUser = {
            name,
            email,
            ...(password && { password }), // Update password only if entered
        };

        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                Alert.alert('Success', 'Profile updated successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="gray"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Password Input */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="New Password"
                    placeholderTextColor="gray"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <MaterialCommunityIcons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Retype Password Input */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Re-type Password"
                    placeholderTextColor="gray"
                    secureTextEntry={!retypePasswordVisible}
                    value={retypePassword}
                    onChangeText={setRetypePassword}
                />
                <TouchableOpacity onPress={() => setRetypePasswordVisible(!retypePasswordVisible)}>
                    <MaterialCommunityIcons name={retypePasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        paddingVertical: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        width: '90%',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputPassword: {
        flex: 1,
        color: '#fff',
        paddingVertical: 15,
    },
    saveButton: {
        width: '90%',
        backgroundColor: '#d97941',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

