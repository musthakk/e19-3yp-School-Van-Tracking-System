import { View, Text, Alert, BackHandler, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const UserHome = ({ navigation}) => {

  // get username from the SecureStore
  let username; // user's username and firstname,

  // track children details of the user..
  const [childrenDetails, setchildrenDetails] = useState([]);

  const [firstName, setFirstName] = useState('');

  // Restricting the back navigator button behavior in the home page.. 
  // useFocusEffect is used to point the restriction on home page when it's only active.
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
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

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  // Clear stored jwtToken and other userDetails from the SecuredStore when user Logout his self..
  const handleLogout = async () => {
    // Clear the token from SecureStore
    await SecureStore.deleteItemAsync('jwtToken');

    // clear user details..
    await SecureStore.deleteItemAsync('identity');

    await SecureStore.deleteItemAsync('username');
  

    // Navigate back to the login screen
    navigation.replace('login');
  };


  // onStart of this home page, send username to the backend and from there get and show the children details..
  const getUserHomeDetails = async () => {

    try {
      // get username of the user from the SecureStore.
      username = await SecureStore.getItemAsync('username');

      const response = await fetch('http://13.126.69.29:3000/getUserAndChildrenInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username
        }),
      });

      if (!response.ok) {
        // Handle non-successful response
        throw new Error('Server Error.');
      }

      // get the response..
      const userAndChildrenDetails = await response.json();     // full name of ther user.. and children details..

      setFirstName(userAndChildrenDetails.parentFullName.split(" ")[0]);
      
      setchildrenDetails(userAndChildrenDetails.childrenDetails);

    } catch (error) {
      Alert.alert('Error in fetching the children data', error.message);
    }

  };


  // Pre-define some profile images for the children
  const childProfileImages = {
    'boy2.png': require('../assets/childProfiles/boy2.png'),
    'boy3.png': require('../assets/childProfiles/boy3.png'),
    'boy5.png': require('../assets/childProfiles/boy5.jpg'),
    'girl1.png': require('../assets/childProfiles/girl1.jpg'),
    'girl2.png': require('../assets/childProfiles/girl2.png'),
    'girl3.png': require('../assets/childProfiles/girl3.png'),
    'girl4.png': require('../assets/childProfiles/girl4.png'),
    'girl5.png': require('../assets/childProfiles/girl5.png'),
  }

  

  // color backgrounds for children Details container..
  let colorsArray = [colors.lightBluemui, colors.lightLime, colors.lightTeal, colors.lightOrangeMui, colors.lightBrown];


  let childrenData = childrenDetails.map((child, index) => (

    <TouchableOpacity key={index} style={{ ...styles.childTouchable, backgroundColor: colorsArray[index % 5] }}>
      {/* chile profile avatar png */}
      <View style={styles.childAvatarContainer}>
        <Image source={childProfileImages[child.profileAvatar]} style={styles.childAvatar}/>
      </View>

      {/* Information about the child */}
      <View>
        {/* children name */}
        <View style={styles.singleDetailBlock}>
          <Text style={styles.DetailPrompt}>Child name: </Text>
          <Text style={styles.DetailData}>{child.name}</Text>
        </View>

        {/* Agency */}
        <View style={styles.singleDetailBlock}>
          <Text style={styles.DetailPrompt}>Agency: </Text>
          <Text style={styles.DetailData}>{child.agency}</Text>
        </View>

        {/* Vehicle ID */}
        <View style={styles.singleDetailBlock}>
          <Text style={styles.DetailPrompt}>Vehicle ID: </Text>
          <Text style={styles.DetailData}>{child.vehicleID}</Text>
        </View>

        {/* Travelling Status */}
        <View style={styles.singleDetailBlock}>
          <Text style={styles.DetailPrompt}>Travelling Status: </Text>
          {
            child.travellingStatus === 1 ? <Text style={{...styles.DetailData, color: colors.red}}>Travelling..</Text> 
            : <Text style={{...styles.DetailData, color: colors.gray}}>Not Travelling..</Text>
          }
          
        </View>

      </View>

    </TouchableOpacity>

  ));

  useFocusEffect(
    React.useCallback(() => {
      // Call the function immediately
      getUserHomeDetails();
  
      // Then call the function every 2 seconds
      const intervalId = setInterval(getUserHomeDetails, 6000);
  
      // Clear the interval when the screen is unfocused
      return () => clearInterval(intervalId);
    }, [])
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

        <View style={styles.addChildBar}>

          {/* Add child Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('addChild')}
            style={styles.addChildButton}
          >
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
            Hello {firstName}
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


        {/* Show the added children of a particular user... */}
        <View style={{ height: 412, width: '100%', marginTop: 40, }}>
          <ScrollView
            style={{
              paddingVertical: 8,
            }}
            showsVerticalScrollIndicator={false}
            pagingEnabled
          >
            {
              childrenData.length === 0 ?
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    source={require('../assets/fileNotFound2.jpg')}
                    style={{ height: 300, width: 300 }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: 'Outfit-Regular',
                    }}
                  >
                    No children accounts found..
                  </Text>
                </View>
                : childrenData
            }

              {/* Logout button  */}
              <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5, marginTop: 50, marginBottom: 50, }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Logout: userHome</Text>
              </TouchableOpacity>

          </ScrollView>
        </View>

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
    marginTop: 5
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

  childTouchable: {
    flexDirection: 'row',
    height: 130,
    borderRadius: 30,
    borderColor: colors.black,
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  childAvatarContainer: {
    height: 90,
    width: 90,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },

  childAvatar: {
    height: 89,
    width: 89,
    borderRadius: 50,
  },

  singleDetailBlock: {
    flexDirection: 'row',

  },

  DetailPrompt: {
    marginLeft: 20,
    color: colors.black,
    fontFamily: 'Outfit-Bold',
    fontSize: 15,
  },

  DetailData: {
    marginLeft: 8,
    color: colors.black,
    fontFamily: 'Outfit-Regular',
    fontSize: 15,
  },


});

export default UserHome