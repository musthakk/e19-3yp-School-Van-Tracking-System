import { View, Text,Alert, BackHandler, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';

const DriverHome = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    // Set up the back button handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      // Remove the back button handler when the component is unmounted
      backHandler.remove();
    };
  }, []);

  const handleLogout = async () => {
    // Clear the token from SecureStore
    await SecureStore.deleteItemAsync('jwtToken');
    // Navigate back to the login screen
    navigation.replace('login');
  };

  return (
    // Your home screen components and UI here
    // ...

    // Example: Logout button
    <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 , marginTop: 100}}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Logout: driverHome</Text>
    </TouchableOpacity>
  );
};

export default DriverHome