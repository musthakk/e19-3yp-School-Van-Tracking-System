import { View, Text, Alert, BackHandler, TouchableOpacity, StyleSheet, ScrollView, Image, RefreshControl, TouchableWithoutFeedback, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const UserHome = ({ navigation }) => {

  // refresh control..
  const [refreshing, setRefreshing] = useState(false);

  // showOptions.
  const [showOption, setShowOption] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserHomeDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  // function to navigate the user to the map view for track the varified child's travelling..
  const trackChildren = (verifiedStatus, childName) => {
    if (verifiedStatus) {
      // navigate the user to the tracking screen
      navigation.navigate("mapScreen", { childName: childName });

    } else {
      Alert.alert("Can't Track...", // Title of the alert
        "The child has not been verified by the Admin yet." // Message of the alert
      )
    }
  };

  // Pre-define some profile images for the children
  const childProfileImages = {
    'boy1.png': require('../assets/childProfiles/boy1.png'),
    'boy2.png': require('../assets/childProfiles/boy2.png'),
    'boy3.png': require('../assets/childProfiles/boy3.png'),
    'boy4.png': require('../assets/childProfiles/boy4.png'),
    'boy5.png': require('../assets/childProfiles/boy5.jpg'),
    'boy6.png': require('../assets/childProfiles/boy6.png'),
    'boy7.png': require('../assets/childProfiles/boy7.png'),
    'girl1.png': require('../assets/childProfiles/girl1.jpg'),
    'girl2.png': require('../assets/childProfiles/girl2.png'),
    'girl3.png': require('../assets/childProfiles/girl3.png'),
    'girl4.png': require('../assets/childProfiles/girl4.png'),
    'girl5.png': require('../assets/childProfiles/girl5.png'),
    'girl6.png': require('../assets/childProfiles/girl6.png'),
    'girl7.png': require('../assets/childProfiles/girl7.png'),
    'girl8.png': require('../assets/childProfiles/girl8.png'),
    'girl9.png': require('../assets/childProfiles/girl9.png'),

  }



  // color backgrounds for children Details container..
  let colorsArray = [colors.lightBluemui, colors.lightLime, colors.lightTeal, colors.lightOrangeMui, colors.lightBrown];


  let childrenData = childrenDetails.map((child, index) => {
    if (child.verifiedStatus) {
      return (
        <TouchableOpacity
          key={index}
          style={{ ...styles.childTouchable, backgroundColor: colorsArray[index % 5] }}
          onPress={() => trackChildren(child.verifiedStatus, child.name)}
        >
          {/* Child profile avatar png */}
          <View style={styles.childAvatarContainer}>
            <Image source={childProfileImages[child.profileAvatar]} style={styles.childAvatar} />
          </View>

          {/* Information about the child */}
          <View>
            {/* Children name */}
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
              <Text style={styles.DetailPrompt}>Status: </Text>
              {child.travellingStatus === 1 ? (
                <Text style={{ ...styles.DetailData, color: colors.red }}>Travelling..</Text>
              ) : (
                <Text style={{ ...styles.DetailData, color: colors.gray }}>Not Travelling..</Text>
              )}
            </View>
          </View>

          {/* Indication symbol saying child is verified by the admin */}
          <Ionicons
            name='checkmark-circle'
            size={50}
            style={{ color: colors.green, position: 'absolute', right: 15 }}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  });


  useFocusEffect(
    React.useCallback(() => {
      // Call the function immediately
      getUserHomeDetails();

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

          {/* options Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 16,
              padding: 8,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowOption(true)}
          >
            <Ionicons
              name='ellipsis-vertical-sharp'
              size={28}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={showOption}
          onRequestClose={() => setShowOption(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowOption(false)}>
            <View
              style={{ flex: 1, }}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 15,
                  borderRadius: 10,
                  position: 'absolute',
                  right: 16,
                  top: 45,

                  // shadown Details..
                  shadowColor: colors.black,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3.84,
                  elevation: 8,

                }}
              >
                <TouchableOpacity style={styles.modalTouchable} onPress={() => navigation.navigate('userProfile')}>
                  <Text style={styles.modalText}>Profile Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalTouchable} onPress={() => navigation.navigate('about')}>
                  <Text style={styles.modalText}>About</Text>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


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


        {/* Show the added children of a particular user... */}
        <View style={{ height: 412, width: '100%', marginTop: 40, }}>
          <ScrollView
            style={{
              paddingVertical: 8,
            }}
            showsVerticalScrollIndicator={false}
            pagingEnabled
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                    style={{ height: 300, width: 300, }}
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
                : (<View style={{marginBottom: 80,}}>
                  {childrenData}
                </View>)
            }

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
    paddingHorizontal: 18,
  },

  childAvatarContainer: {
    height: 95,
    width: 95,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },

  childAvatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
  },

  singleDetailBlock: {
    flexDirection: 'row',

  },

  DetailPrompt: {
    marginLeft: 10,
    color: colors.black,
    fontFamily: 'Outfit-Bold',
    fontSize: 13,
  },

  DetailData: {
    marginLeft: 6,
    color: colors.black,
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
  },

  modalText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },

  modalTouchable: {
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 3,
  }

});

export default UserHome