import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// import custom color module..
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const UserProfile = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        
        {/* user profile Image with his name portions first letter */}
        <View style={{alignItems: 'center'}}>
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
            <Text style={{fontSize: 40,}}>M</Text>
          </View>
        </View>
        

        {/* user details */}
        <View style={styles.userdetailsContainer}>

          {/* Full Name */}
          <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='person-outline' size={22} style={{color: colors.gray}}/>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Full-name</Text>
              <Text style={styles.dataText}>Samsudeen Mohamed Musthak</Text>
            </View>

            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 2,
              }}
            >
              <Ionicons name='pencil' size={22} style={{color: colors.blue}}/>
            </TouchableOpacity>

          </View>

          {/* user name */}
          <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='person-outline' size={22} style={{color: colors.gray}}/>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Username</Text>
              <Text style={styles.dataText}>Mk123</Text>
            </View>

          </View>

          {/* Contact Number */}
          <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='call-outline' size={22} style={{color: colors.gray}}/>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Phone</Text>
              <Text style={styles.dataText}>0764638778</Text>
            </View>

          </View>

          {/* Email */}
          <View style={styles.userdetailsInnerContainer}>
            <Ionicons name='mail-outline' size={22} style={{color: colors.gray}}/>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.promptText}>Mail</Text>
              <Text style={styles.dataText}>musthak7413400@gmail.com</Text>
            </View>

          </View>

        </View>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    backgroundColor: colors.white,
  },

  container:{
    flex: 1,
    marginHorizontal: 28,
  },

  userdetailsContainer:{
    marginTop: 40,
  },

  userdetailsInnerContainer:{
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


})

export default UserProfile