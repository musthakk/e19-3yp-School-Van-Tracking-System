import { View, Text,Alert, BackHandler, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, TextInput, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useEffect, useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { first } from 'lodash';


const UserHome = ({ navigation, route}) => {

  // define route parameters..
  const {fullName, username} = route.params;

  // extract the firstname of the user from the fullName
  const firstName = fullName.split(" ")[0];


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

  const handleLogout = async () => {
    // Clear the token from SecureStore
    await SecureStore.deleteItemAsync('jwtToken');
    // Navigate back to the login screen
    navigation.replace('login');
  };


  let children = [];

  let colorsArray = [colors.lightBluemui, colors.lightLime, colors.lightTeal, colors.lightOrangeMui, colors.lightBrown];

  for (let i=0; i<2; i++)
  {
    children.push(
      <TouchableOpacity key={i} onPress={() => console.log(`Pressed ${i}`)} style={{...styles.childTouchable, backgroundColor:colorsArray[i]}}>
        {/* chile profile image png */}
        <View style={styles.childProfileContainer}>

        </View>

        <Text style={{marginLeft: 20,}}>Touchable {i}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        
        <View style={styles.addChildBar}>

          {/* Add child Button */}
          <TouchableOpacity 
            onPress={()=>navigation.navigate('addChild')}
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

        {/* Logout button  */}
        <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 , marginTop: 50}}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Logout: userHome</Text>
        </TouchableOpacity>

        {/* Show the added children of a particular user... */}
        <View style={{height: 412, width: '100%', marginTop: 40,}}>
          <ScrollView 
            style={{paddingVertical: 8,}}
            showsVerticalScrollIndicator = {false}
            pagingEnabled
          >
            {
              children.length === 0 ? 
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image 
                  source={require('../assets/fileNotFound2.jpg')}
                  style={{height: 300, width: 300}}
                />
                <Text
                  style = {{
                    fontSize: 22,
                    fontFamily: 'Outfit-Regular',
                  }}
                >
                  No children accounts found..
                </Text>
              </View>
              : children
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
    paddingHorizontal: 20,
  },

  childProfileContainer: {
    height: 90, 
    width: 90,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.red,
  },




});

export default UserHome