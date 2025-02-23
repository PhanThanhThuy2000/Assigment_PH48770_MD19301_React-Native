import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://67b6ce1507ba6e590841d413.mockapi.io/users';

type RootParamList = {
    Login: undefined;
    Home: undefined;
    SignUp: undefined;
    ResetPass: undefined;
    Welcome: undefined;
    Detail: undefined;
    Admin: undefined;
    App: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    const handleSignIn = async () => {
        try {
            const response = await fetch(API_URL);
            const users = await response.json();
            const user = users.find((u: any) => u.email === email && u.password === password);

            if (user) {
                Alert.alert('Login Successful', 'Welcome to Lungo!');
                setError(false);

                if (user.role === 1) {
                    navigation.replace('App');
                } else if (user.role === 2) {
                    navigation.replace('Admin'); // Đảm bảo rằng bạn đã thêm màn hình 'Admin' vào navigation
                } else {
                    Alert.alert('Access Denied', 'Your account does not have the required permissions.');
                }
            } else {
                setError(true);
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again later.');
        }
    };


    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
            <View style={styles.container}>
                <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Welcome to Lungo !!</Text>
                <Text style={styles.subtitle}>Login to Continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="pakdeku@ohyes.com"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

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
                        <MaterialCommunityIcons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>

                {error && <Text style={styles.errorText}>Invalid email or password. Try Again!</Text>}

                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpLink}>Don't have an account? <Text style={styles.signUpText}>Click Register</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ResetPass')}>
                    <Text style={styles.resetLink}>Forgot Password? <Text style={styles.resetText}>Click Reset</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a1a', padding: 20, justifyContent: 'center', alignItems: 'center' },
    safeArea: { flex: 1, backgroundColor: 'white' },
    logo: { width: 100, height: 100, marginBottom: 20 },
    title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 5 },
    subtitle: { fontSize: 16, color: '#aaa', marginBottom: 20 },
    input: { width: '100%', backgroundColor: '#333', color: '#fff', borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
    passwordContainer: { width: '100%', flexDirection: 'row', alignItems: 'center' },
    passwordInput: { flex: 1 },
    eyeIcon: { position: 'absolute', right: 15, top: 14 },
    errorText: { color: '#f66', marginBottom: 10 },
    signInButton: { width: '100%', backgroundColor: '#d97941', borderRadius: 8, padding: 15, alignItems: 'center', marginBottom: 15 },
    signInButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    signUpLink: { color: '#aaa', marginTop: 10, textAlign: 'center' },
    signUpText: { color: '#d97941', fontWeight: 'bold' },
    resetLink: { color: '#aaa', marginTop: 5, textAlign: 'center' },
    resetText: { color: '#d97941', fontWeight: 'bold' },
});
