import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import React, { Fragment, Profiler, useEffect, useState } from 'react'

import * as SecureStore from 'expo-secure-store';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// import colors module.
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';




const MapScreen = ({navigation, route}) => {
  // get the child name from the userHomePage.js
  const {childName} = route.params;

  // get the username of the user from the secureStore and store it..
  const [username, setUsername] = useState("");

  // InfoContainer.. (details of the Driver and Ride.)
  const [showInfo, setShowInfo] = useState(false);

  // from the server end-point get details from chidren, driver, and vehicle collectino and store it as objects..
  // These below details will be used to populate the tracking interface with necessary information..
  const [childDetail, setChildDetail] = useState(null);
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [driverDetail, setDriverDetail] = useState(null);


  useEffect(()=>{

    const getUsername = async () => {
      const result = await SecureStore.getItemAsync('username');
      setUsername(result);
    };

    // onStart of this tracking page, send username, childname to the backend and from there get the vehicle, driver detials..
    const getTravelInfo = async () => {

      try {
        
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

  },[]);


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
          style={styles.map }
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

          onPress={()=>navigation.navigate("userNavScreen")}
        >
          <Ionicons name='arrow-back' size={35}/>
        </TouchableOpacity>
        

        <Text style={{alignSelf: 'center', fontSize: 30, fontFamily: 'Outfit-Bold'}}>{childName}</Text>
        
      </View>

      {/* showInfo or Info */}
      <View style={styles.footer}>
        
        {
          (!showInfo)? (

            <TouchableOpacity
            style={styles.showInfoButton}
            onPress={()=>{setShowInfo(true)}}
            >
              <Text style={{fontSize: 22, fontFamily:'Outfit-Bold', color: colors.white}}>Travel Info</Text>
            </TouchableOpacity> 

          ):(

            <View style={styles.InfoContainer}>
              
              <View style={styles.DetailsContainer}>

              </View>

              <TouchableOpacity
              style={styles.minimizeButton}
              onPress={()=>{setShowInfo(false)}}
              >
                <Text style={{fontSize: 22, fontFamily:'Outfit-Bold', color: colors.white}}>Minimize</Text>
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


    InfoContainer:{
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

    DetailsContainer:{
      height: 200,
      width: 360,
      backgroundColor: colors.lightGray,
      borderRadius: 20,
      borderColor: colors.lightGray,
      borderWidth: 1,
      position: 'absolute',
      bottom: 100,
      alignSelf: 'center',

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.84,
      elevation: 4,
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