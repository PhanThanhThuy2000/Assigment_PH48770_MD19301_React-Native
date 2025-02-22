import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
    App: undefined;
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

const settingsOptions = [
    { id: '1', title: 'History', icon: 'history', screen: 'History' },
    { id: '2', title: 'Personal Details', icon: 'account', screen: 'EditAccount' },
    { id: '3', title: 'Address', icon: 'map-marker', screen: 'Address' },
    { id: '4', title: 'Payment Method', icon: 'credit-card', screen: 'EditAccount' },
    { id: '5', title: 'About', icon: 'information', screen: 'About' },
    { id: '6', title: 'Help', icon: 'help-circle', screen: 'Help' },
    { id: '7', title: 'Log out', icon: 'logout', screen: 'Logout' },
];

export default function SettingScreen() {
    const navigation = useNavigation<SettingScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);

    // Xử lý đăng xuất
    const handleLogout = () => {
        setModalVisible(false);
        navigation.navigate('Login'); // Quay về màn hình đăng nhập
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('App')} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Setting</Text>
                <View style={{ width: 24 }} />
            </View>
            <FlatList
                data={settingsOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() =>
                            item.screen === 'Logout' ? setModalVisible(true) : navigation.navigate(item.screen as any)
                        }
                    >
                        <MaterialCommunityIcons name={item.icon} size={24} color="#d97941" style={styles.icon} />
                        <Text style={styles.optionText}>{item.title}</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            />

            {/* Modal xác nhận đăng xuất */}
            <Modal transparent={true} animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        paddingTop: StatusBar.currentHeight || 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    icon: {
        width: 30,
        textAlign: 'center',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#1c1c1c',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#d97941',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
