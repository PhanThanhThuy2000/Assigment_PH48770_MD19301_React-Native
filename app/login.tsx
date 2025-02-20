// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
    Login: undefined;
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Welcome: undefined;
    Detail: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    const handleSignIn = () => {
        if (email === 'p' && password === '1') {
            Alert.alert('Login Successful', 'Welcome to Lungo!');
            navigation.replace('Home');
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Welcome to Lungo !!</Text>
            <Text style={styles.subtitle}>Login to Continue</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="pakdeku@ohyes.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Input */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="••••••••"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={24}
                        color="#aaa"
                    />
                </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error && <Text style={styles.errorText}>Password is not true. Try Again!</Text>}

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Google Sign In Button */}
            <TouchableOpacity style={styles.googleButton}>
                <MaterialCommunityIcons name="google" size={20} color="#fff" />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top:14
        
    },
    errorText: {
        color: '#f66',
        marginBottom: 10,
    },
    signInButton: {
        width: '100%',
        backgroundColor: '#d97941',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    googleButton: {
        width: '100%',
        backgroundColor: '#4285F4',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
});
