import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import * as SecureStore from 'expo-secure-store';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// import colors module.
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';



const MapScreen = ({ navigation, route }) => {
  // get the child name from the userHomePage.js
  const { childName } = route.params;

  // get the username of the user from the secureStore and store it..
  const [username, setUsername] = useState("");

  // InfoContainer.. (details of the Driver and Ride.)
  const [showInfo, setShowInfo] = useState(false);

  // from the server end-point get details from chidren, driver, and vehicle collectino and store it as objects..
  // These below details will be used to populate the tracking interface with necessary information..
  const [childDetail, setChildDetail] = useState({});
  const [vehicleDetail, setVehicleDetail] = useState({});
  const [driverDetail, setDriverDetail] = useState({});


  useEffect(() => {

    const getUsername = async () => {
      const result = await SecureStore.getItemAsync('username');
      setUsername(result);
    };

    // onStart of this tracking page, send username, childname to the backend and from there get the vehicle, driver detials..
    const getTravelInfo = async () => {

      try {
        const username = await SecureStore.getItemAsync('username');
        const response = await fetch('http://13.126.69.29:3000/getChildTravelInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            childName
          }),
        });

        if (!response.ok) {
          // Handle non-successful response
          throw new Error('Server Error.');
        }

        // get the response..
        const TravelInfo = await response.json();     // full name of ther user.. and children details..

        // fetchChildDetail and set it..
        setChildDetail(TravelInfo.childDetails);

        // fetch VehicleDetail and set it..
        setVehicleDetail(TravelInfo.vehicleDetails);

        // fetch DriverDetail and set it..
        setDriverDetail(TravelInfo.driverDetails);


      } catch (error) {
        Alert.alert('Error in fetching the children data', error.message);
      }

    };

    // get the username from the secureStore..
    getUsername();

    // fetch the data from the database..
    getTravelInfo();

  }, []);


  // data array to access the renderData
  const data = [0,1];

  // vehicle detail and driver detail to be rendered in a flat list..
  const renderData = [

    <View style={styles.DetailsContainer}>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 20,
            marginBottom: 10,
            color: colors.black,
          }}
        >
          {childDetail.vehicleID}
        </Text>
        <Image source={require('../assets/van.png')} style={{ height: 91.233, width: 140 }} />
      </View>

      {/* Texts */}
      <View style={{...styles.TextContainer, justifyContent: 'center'}}>

        {/* Transportation Status */}
        <View
          style={{
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.textTitle}>Transportation Status:</Text>
          {
            (vehicleDetail.vehicleTravellingStatus === 1) ?
              <Text style={styles.responsePositive}>In Progress..</Text> :
              <Text style={styles.responseNegative}>Not in Progress..</Text>
          }

        </View>

        {/* Progress */}
        {
          (vehicleDetail.vehicleTravellingStatus === 1) ?
            (
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: colors.gray,
                  paddingTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={styles.textTitle}>Progress:</Text>

                {
                  (vehicleDetail.headingStatus === 1) ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.response}>Home</Text>
                      <Ionicons name='arrow-forward-sharp' size={23} style={{ marginHorizontal: 5, color: colors.darkGreen }} />
                      <Text style={styles.response}>School</Text>
                    </View>

                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.response}>School</Text>
                      <Ionicons name='arrow-forward-sharp' size={23} style={{ marginHorizontal: 5, color: colors.darkGreen }} />
                      <Text style={styles.response}>Home</Text>
                    </View>)
                }

              </View>
            ) : (<></>)
        }

      </View>
    </View>,

    <View style={styles.DetailsContainer}>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 20,
            marginBottom: 10,
            color: colors.black,
          }}
        >
          Driver
        </Text>
        <Image source={require('../assets/driver.png')} style={{ height: 140, width: 140, }} />
      </View>

      {/* Texts */}
      <View style={styles.TextContainer}>

        <View
          style={{
            marginLeft: 20,
            marginTop: 40,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,

          }}
        >
          <Text style={styles.textTitle}>Name:</Text>
          <Text style={styles.response}>{driverDetail.fullName}</Text>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 5,
          }}
        >
          <Text style={styles.textTitle}>Contact Number: </Text>
          <Text style={styles.response}>{driverDetail.contactNumber}</Text>
        </View>
      </View>

    </View>

  ]

  return (

    <View style={styles.container}>
      <View
        style={{
          height: 43,
          width: "100%",
          backgroundColor: colors.orange,
        }}
      >

      </View>

      <View
        style={{
          marginTop: 43,
          flex: 1,
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 7.251916,
            longitude: 80.592455,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{ latitude: 7.251916, longitude: 80.592455 }}
            title="Your Location"
            description="This is your current location"
          />

        </MapView>

      </View>

      {/* Header container.. */}
      <View style={styles.Header}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 20
          }}

          onPress={() => navigation.navigate("userNavScreen")}
        >
          <Ionicons name='arrow-back' size={35} />
        </TouchableOpacity>


        <Text style={{ alignSelf: 'center', fontSize: 30, fontFamily: 'Outfit-Bold' }}>{childName}</Text>

      </View>

      {/* showInfo or Info */}
      <View style={styles.footer}>

        {
          (!showInfo) ? (
            // show Info Button
            <TouchableOpacity
              style={styles.showInfoButton}
              onPress={() => { setShowInfo(true) }}
            >
              <Text style={{ fontSize: 22, fontFamily: 'Outfit-Bold', color: colors.white }}>Travel Info</Text>
            </TouchableOpacity>

          ) : (

            // Info Container..

            <View style={styles.InfoContainer}>

              <Text style={styles.agencyNameText}>{childDetail.agency}</Text>

              <FlatList
                style={styles.flatList}
                data={data}
                renderItem={({item}) => renderData[item]} 
                horizontal={true}
                // showsHorizontalScrollIndicator={false}
                bounces={false}
              />

              {/* Minimize Button */}
              <TouchableOpacity
                style={styles.minimizeButton}
                onPress={() => { setShowInfo(false) }}
              >
                <Text style={{ fontSize: 22, fontFamily: 'Roboto-Bold', color: colors.white }}>Minimize</Text>
              </TouchableOpacity>
            </View>

          )
        }

      </View>


    </View>

  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    width: '100%',
  },

  Header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 43,
    height: 65,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Add this line

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,

  },

  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },

  showInfoButton: {
    height: 70,
    width: 380,
    borderRadius: 10,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },


  InfoContainer: {
    height: 360,
    width: 380,
    backgroundColor: colors.white,
    borderRadius: 20,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 8,

  },

  flatList: {
    height: 220,
    position: 'absolute',
    bottom: 90,
  },  

  DetailsContainer: {
    flexDirection: 'row',
    height: 200,
    width: 360,
    marginHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 15,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },

  imageContainer: {
    height: 180,
    width: 150,
    borderRightWidth: 1,
    borderRightColor: colors.black,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  TextContainer: {
    height: 180,
    width: 170,
    alignSelf: 'center',
    marginLeft: 10,
  },

  textTitle: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },

  response: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },

  responsePositive: {
    height: 23,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.darkGreen,
  },

  responseNegative: {
    height: 23,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.red,
  },

  agencyNameText: {
    fontSize: 30,
    fontFamily: 'NotoSansMono-Bold',
    paddingTop: 10,
    alignSelf: 'center',
    color: colors.gray,
  },

  minimizeButton: {
    position: 'absolute',
    bottom: 15,
    height: 60,
    width: 300,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }

});

export default MapScreen