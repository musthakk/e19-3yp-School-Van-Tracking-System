import { View, Text,Alert, BackHandler, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, Dimensions} from 'react-native'
import React, {useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';


const UserHome = ({ navigation }) => {
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
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        
        <View style={styles.addChildBar}>

          {/* Add child Button */}
          <TouchableOpacity style={styles.addChildButton}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Outfit-Bold',
              }}
            >
              Add a child
            </Text>
          </TouchableOpacity>
          
          {/* Settings Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 25
            }}
          >
            <Ionicons
              name='settings-outline'
              size={28}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.userGreetings}>
          {/* Greetings */}
          <Text
            style={{
              fontSize: 40,
              fontFamily: 'Outfit-Bold',
            }}
          >
            Hello Musthak
          </Text>
          
          {/* Track Your children prompt */}
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Outfit-Regular',
              color: colors.gray,

            }}
          >
            Track your child's transportation
          </Text>
        </View>

        {/* <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map }
          initialRegion={{
            latitude: 37.78825,
            longitude: 100.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: 100.4324 }}
            title="Your Location"
            description="This is your current location"
          />
        </MapView> */}

        {/* Logout button  */}
        {/* <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 , marginTop: 50}}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Logout: userHome</Text>
        </TouchableOpacity> */}

      </View>
    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({

  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 53
  },

  addChildBar: {
    marginLeft: 25,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },

  addChildButton: {
    height: 40,
    width: 120,
    borderRadius: 50, // Adjust the value as needed
    borderWidth: 2,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center'
  },

  userGreetings: {
    marginLeft: 25,
    marginTop: 60,
  },






});

export default UserHome