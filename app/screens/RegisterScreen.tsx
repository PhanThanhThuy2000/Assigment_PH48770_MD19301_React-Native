import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
const API_URL = 'https://67b6ce1507ba6e590841d413.mockapi.io/users'; // Thay thế bằng URL MockAPI của bạn
// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
  Home: undefined;
  Login: undefined;
  ResetPass: undefined;
  Cart: undefined;
  ProductDetail: undefined;
  Favourite: undefined;
  Setting: undefined;
  EditAccount: undefined;
};
type SettingScreenNavigationProp = StackNavigationProp<RootParamList>;
export default function RegisterScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const paddingTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Registration complete!');
        navigation.navigate('Login'); // Chuyển về trang Login sau khi đăng ký thành công
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: paddingTopValue }]}>
      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Lungo !!</Text>
        <Text style={styles.subtitle}>Register to Continue</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Coll John"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Pakdeku@ohyes.com"
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
            placeholder="Password"
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

        {/* Confirm Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Re-type password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Redirect to Sign In */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>
            You have an account? <Text style={styles.signInText}>Click Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    top: 15,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#d97941',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInLink: {
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  signInText: {
    color: '#d97941',
    fontWeight: 'bold',
  },
});
