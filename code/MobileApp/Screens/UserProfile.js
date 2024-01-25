import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as SecureStore from 'expo-secure-store';

// import custom color module..
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const UserProfile = ({ route }) => {

  const { fullName, username, contactNumber, email, numberOfChildren } = route.params;

  /* Get the First letters from the frist name and last name of the full name and put those letters as Profile Avatar*/
  const nameArray = fullName.split(" ");

  let nameLetters = "";

  for (let name of nameArray) {
    nameLetters += name[0];
  }

  // track change of Fullname of the user..
  const [newFullname, setNewFullname] = useState(fullName);

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
    setNewFullname(fullName);
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
              <Text style={styles.dataText}>{username}</Text>
            </View>

          </View>}

          {/* Contact Number */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='call-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Phone</Text>
              <Text style={styles.dataText}>{contactNumber}</Text>
            </View>

          </View>}

          {/* Email */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='mail-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Mail</Text>
              <Text style={styles.dataText}>{email}</Text>
            </View>

          </View>}

          {/* Number of Children added */}
          {!editorVisible && <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='people-outline' size={22} style={{ color: colors.gray }} />

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Number of Children added:</Text>
              <Text style={styles.dataText}>{numberOfChildren}</Text>
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