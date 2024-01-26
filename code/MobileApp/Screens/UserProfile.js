import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

// import custom color module..
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const UserProfile = () => { 

  const [Username, setUsername] = useState('');
  const [fullName, SetfullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [verifiedChildrenCount, setVerifiedChildrenCount] = useState("");

  // track change of Fullname of the user..
  const [newFullname, setNewFullname] = useState("");

  // track fullname editor visibility..
  const [editorVisible, setEditorVisible] = useState(false);

  // functin to handle editor's save button..
  const saveHandle = async()=>{

    setEditorVisible(false);
    await SecureStore.deleteItemAsync('fullName');
    await SecureStore.setItemAsync('fullName', newFullname);

  }

  // function to handle editor's cancel button..
  const cancelHandle = ()=>{
    setEditorVisible(false);
    setNewFullname();
  }


  // onStart of this userProfile page, send username to the backend and from there get and show his details..
  const getUserProfile = async () => {

    try {
      // get username of the user from the SecureStore.
      let username = await SecureStore.getItemAsync('username');

      setUsername(username);

      const response = await fetch('http://13.126.69.29:3000/getUserInfo', {
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
      const userProfileInfo = await response.json();     // users personal information..
      SetfullName(userProfileInfo.userDetails.fullName);
      setPhoneNumber(userProfileInfo.userDetails.contactNumber);
      setMail(userProfileInfo.userDetails.email);
      setVerifiedChildrenCount(userProfileInfo.VerifiedchildrenCount);

      

    } catch (error) {
      Alert.alert('Error in fetching the children data', error.message);
    }

  };


  useFocusEffect(
    React.useCallback(() => {
      // Call the function immediately
      getUserProfile();
  
      // Then call the function every 2 seconds
      const intervalId = setInterval(getUserProfile, 6000);
  
      // Clear the interval when the screen is unfocused
      return () => clearInterval(intervalId);
    }, [])
  );




  /* Get the First letters from the frist name and last name of the full name and put those letters as Profile Avatar*/
  const nameArray = fullName.split(" ");

  let nameLetters = "";

  for (let name of nameArray) {
    nameLetters += name[0];
  }


  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

        {/* user profile Image with his name portions first letter */}
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 80,
              backgroundColor: colors.lightTeal,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 40, }}>{nameLetters}</Text>
          </View>
        </View>


        {/* user details */}
        <View style={styles.userdetailsContainer}>

          {/* Full Name */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>

            <Ionicons name='person-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Full-name</Text>
              <Text style={styles.dataText}>{fullName}</Text>
            </View>

            {/* Touchable icon to change the name of the user if he wants to change */}
            <TouchableOpacity
              onPress={() => setEditorVisible(!editorVisible)}
              style={{
                position: 'absolute',
                right: 2,
              }}
            >
              <Ionicons name='pencil' size={22} style={{ color: colors.blue }} />
            </TouchableOpacity>

          </View>}

          {/* Editor for full name of the user */}
          {editorVisible && 
          <View style={styles.editorContainer}>

            <Text style={{fontSize: 17, fontFamily: 'Roboto-Regular', marginBottom: 5,}}>Enter your fullname</Text>

            <View
              style={{
                borderBottomColor: colors.blue,
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            >
              <TextInput
                value={newFullname}
                style={{
                  fontSize: 17,
                  fontFamily: 'Roboto-Bold',
                }}
                onChangeText={(text)=>setNewFullname(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',                
              }}
            >
              {/* Save */}
              <TouchableOpacity onPress={saveHandle} style={{marginLeft: 12,}}>
                <Text style={{color: colors.blue, fontFamily: 'Roboto-Regular', fontSize: 16}}>Save</Text>
              </TouchableOpacity>
              {/* Cancel */}
              <TouchableOpacity onPress={cancelHandle}>
                <Text style={{color: colors.blue, fontFamily: 'Roboto-Regular', fontSize: 16}}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
          }

          {/* user name */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='person-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Username</Text>
              <Text style={styles.dataText}>{Username}</Text>
            </View>

          </View>}

          {/* Contact Number */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='call-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Phone</Text>
              <Text style={styles.dataText}>{phoneNumber}</Text>
            </View>

          </View>}

          {/* Email */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='mail-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Mail</Text>
              <Text style={styles.dataText}>{mail}</Text>
            </View>

          </View>}

          {/* Number of Children added */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='people-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Number of Children (Verified):</Text>
              <Text style={styles.dataText}>{verifiedChildrenCount}</Text>
            </View>

          </View>}

        </View>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    marginHorizontal: 28,
  },

  userdetailsContainer: {
    marginTop: 40,
  },

  userdetailsInnerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    alignItems: 'center',
    paddingBottom: 13,
    marginBottom: 13,
  },

  detailsTextContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },

  promptText: {
    color: colors.gray,
    fontSize: 15,
  },

  dataText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 17
  },

  editorContainer:{
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    width: '100%',
    height: 120,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },


})

export default UserProfile