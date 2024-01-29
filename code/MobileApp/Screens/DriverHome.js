import { View, Text, Alert, BackHandler, TouchableOpacity, StyleSheet, SafeAreaView, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const DriverHome = ({ navigation }) => {

  // showOptions.(Option modal..)
  const [showOption, setShowOption] = useState(false);

  const [nameLetterAvatar, setNameLetterAvatar] = useState("");
  const [fullName, SetfullName] = useState("");
  const [username, setUsername] = useState('');
  const [driverDetails, setDriverDetails] = useState({});

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


  // onStart of this driverHome page, send username to the backend and from there get and show his details..
  const getDriverInfo = async () => {
    try {
      // get username of the user from the SecureStore.
      let username = await SecureStore.getItemAsync('username');
      setUsername(username);

      const response = await fetch(`http://13.126.69.29:3000/getDriverInfo?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle non-successful response
        throw new Error('Server Error.');
      }

      // get the response..
      const DriverProfileInfo = await response.json();     // driver personal information..
      setDriverDetails(DriverProfileInfo);
      SetfullName(DriverProfileInfo.firstName + " " + DriverProfileInfo.lastName);

    } catch (error) {
      Alert.alert('Error in fetching the driver data', error.message);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      // Call the function immediately
      getDriverInfo();
    }, [])
  );

  /* Get the First letters from the frist name and last name of the full name and put those letters as Profile Avatar*/
  useEffect(() => {
    const nameArray = fullName.trim().split(" ");
    let nameLetters = "";
    for (let name of nameArray) {
      if (name[0] !== undefined)
        nameLetters += name[0];
    }
    setNameLetterAvatar(nameLetters);
  }, [fullName]);

  return (

    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>

          <View style={styles.header}>

            <View style={styles.profileAvatar}>
              <Text style={styles.letterAvatar}>{nameLetterAvatar}</Text>
            </View>

            <View style={{ marginLeft: 10, }}>
              <Text style={styles.driverName}>{driverDetails.firstName + " " + driverDetails.lastName}</Text>
              <Text style={styles.vehicleID}>{driverDetails.agency}:  {driverDetails.assignedVehicle}</Text>
            </View>

          </View>

          {/* options Button */}
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              position: 'absolute',
              right: 10,
              padding: 8,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowOption(true)}
          >
            <Ionicons
              name='ellipsis-vertical-sharp'
              size={35}
            />
          </TouchableOpacity>

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
                    paddingTop: 5,
                    borderRadius: 10,
                    position: 'absolute',
                    right: 16,
                    top: 90,

                    // shadown Details..
                    shadowColor: colors.black,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.84,
                    elevation: 2,

                  }}
                >
                  <TouchableOpacity style={styles.modalTouchable} onPress={() => navigation.navigate('about')}>
                    <Text style={styles.modalText}>About</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {/* End of header part */}
        </View>

        <View style={styles.inspirationalTextContainer}>
          <Text style={{marginLeft: 5, fontFamily: 'Outfit-Bold', fontSize: 18,}}>Dear {driverDetails.firstName + " " + driverDetails.lastName},</Text>
          <Text 
            style={{
              marginHorizontal: 5, 
              fontFamily: 'Outfit-Regular', 
              fontSize: 15,
              alignSelf: 'center',
            }}
          >
            Each turn of the wheel steers the future of our precious cargo - the children. Your role is not just a job,
            it's a responsibility we entrust to our brother. Safe journeys!
          </Text>

        </View>

        <View style={styles.MotiveBackgroundContainer}>
          <Image source={require('../assets/driverMotivation.jpg')} style={styles.InspireBackground} />
        </View>

        <TouchableOpacity style={styles.ridePageNavigationButton} onPress={() => navigation.navigate('travelInfo')}>
          <Ionicons name='arrow-forward' size={50} />
        </TouchableOpacity>


      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 80,
    width: '80%',
    marginTop: 12,
    borderRadius: 60,
    alignItems: 'center',
    marginLeft: 14,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 8,
  },

  profileAvatar: {
    height: 75,
    width: 75,
    marginLeft: 4,
    borderRadius: 80,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  },

  letterAvatar: {
    color: colors.white,
    fontSize: 30,
  },

  driverName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
  },

  vehicleID: {
    fontFamily: 'Outfit-Regular',
    fontSize: 13,
    color: colors.gray,
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
  },

  inspirationalTextContainer: {
    backgroundColor: colors.white,
    height: 120,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 8,
  },

 

  MotiveBackgroundContainer: {
    // backgroundColor: colors.lightBlue,
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  InspireBackground: {
    height: 290,
    width: '90%',
    resizeMode: 'stretch',
    borderRadius: 10,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 2,

  },

  ridePageNavigationButton: {
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 8,

  }

});

export default DriverHome




"but valued members of our family." 
"Each turn of the wheel steers the future of our precious cargo - the children." 


