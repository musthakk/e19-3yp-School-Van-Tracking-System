import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import colors from '../constants/colors';

import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const SignUp = () => {

  // Track the fullName state
  const [fullName, Setfullname] = useState("");

  // Track the userName state
  const [username, Setusername] = useState("");

  // Track the firstname state
  const [contactNumber, SetContactNumber] = useState("");

  // Tracking the Password
  const [password, SetPassword] = useState("");

  // Valid password requirements..
  const isValidPassword = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/; // 8 char minimum, minimum 1 spcial character and 1 numeric character

  // Tracking the confirm password field
  const [cPass, SetcPass] = useState("");

  // Track Email..
  const [email, SetEmail] = useState("");

  // Weak password prompt
  function passwordPrompt() {
    const message = 
    "• Use at least 8 characters \n" +
    "• Use at least 1 number \n" +
    "• Use at least 1 special character";
  
    Alert.alert('Password Requirements', message);
  }

  // input Fields Validation
  // validation variables..
  let isfullnameValid = 0, isusernameValid = 0, isConNumValid = 0, isEmailValid=0, isPasswordValid = 0, isConfirmPasValid = 0;
  
  function Validate()
  {
    const message = "Check the input fields"
    if (!isfullnameValid || !isusernameValid || !isConNumValid || !isEmailValid || !isPasswordValid || !isConfirmPasValid)
    {
      Alert.alert('Validation Error', message);
      return 0;
    }
  }

  const handleSignUp = async () => {

    const validationStatus = Validate();
    if(validationStatus === 0)
      return;

    try {
      const response = await fetch('http://52.66.141.134:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          username,
          contactNumber,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Signup successful');
      } else {
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  // refs..
  const usernameInputRef = useRef(null);
  const conNumberInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const conPassInputRef = useRef(null);


  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

        <View style={{ marginTop: 50, marginBottom: 25 }}>
          <Text style={styles.heading}><Ionicons name='location-outline' color={colors.red} size={25} />Sure<Text>Way..</Text></Text>
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
          contentContainerStyle={styles.scrollview} 
          bounces={false}
          showsVerticalScrollIndicator={false}
          >

            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/SureWayLogo.png')}
                style={styles.logo}
              />

              <Text style={styles.register}>REGISTER</Text>
            </View>

            {/* userInput Field */}
          
            {/* fullName */}
            <View style={styles.inputBox}>
              <Ionicons name='person-circle-outline' size={20} style={styles.icons} />
              <TextInput
                placeholder='Full Name'
                style={styles.textInput}
                onChangeText={(text)=>Setfullname(text)}
                onSubmitEditing={() => usernameInputRef.current.focus()}
              />

              {/* Required Full name */}
              {                
                (fullName !== "") ? (
                  isfullnameValid = 1,
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isfullnameValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
              }

            </View>

            {/* username */}
            <View style={styles.inputBox}>
              <Ionicons name='person-circle-outline' size={20} style={styles.icons} />
              <TextInput
                ref={usernameInputRef}
                placeholder='Username'
                style={styles.textInput}
                onChangeText={(text)=>Setusername(text)}
                onSubmitEditing={()=> conNumberInputRef.current.focus()}
              />

              {/* Required Last name */}
              {                
                (username !== "") ? (
                  isusernameValid = 1,
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isusernameValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
              }

            </View>

            {/* contact Number */}
            <View style={styles.inputBox}>
              <Ionicons name='call-outline' size={20} style={styles.icons} />
              <TextInput
                ref={conNumberInputRef}
                placeholder='Contact Number'
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={(text)=>SetContactNumber(text)}
                onSubmitEditing={()=> emailInputRef.current.focus()}
              />

              {/* Required Contact Number */}
              {                
                !isNaN(contactNumber) && ((contactNumber !== "" && contactNumber.length === 10 && contactNumber[0] === "0") || (contactNumber !== "" && contactNumber.length === 9 && contactNumber[0] !=="0"))? (
                  isConNumValid = 1,  
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isConNumValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
              }
            </View>

            {/* Email */}
            <View style={styles.inputBox}>
              <Ionicons name='mail-outline' size={20} style={styles.icons} />
              <TextInput
                ref={emailInputRef}
                placeholder='Email'
                style={styles.textInput}
                onChangeText={(text)=>SetEmail(text)}
                onSubmitEditing={()=> passwordInputRef.current.focus()}
              />
              
              {/* verify @ symbol in Email */}
              {                
                ((email.includes("@")) && email[email.length-1] != "@" && email[0] !== ".") ? (
                  isEmailValid = 1,
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isEmailValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
              }

            </View>

            {/* password */}
            <View style={styles.inputBox}>
              <Ionicons name='lock-closed-outline' size={20} style={styles.icons} />
              <TextInput
                ref={passwordInputRef}
                placeholder='Password'
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text)=>SetPassword(text)}
                onSubmitEditing={()=>conPassInputRef.current.focus()}
              />

              {/* password verification */}

              {                
                (password !== "" && isValidPassword.test(password)) ? (
                  isPasswordValid = 1,
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isPasswordValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
               }

            </View>
            
            {/* Weak Password prompt */}
            <View style={{flexDirection:"row", marginLeft: 10, marginTop: -12, marginBottom: 15}}>
              <Text style={{fontSize: 12}}>Weak password</Text>
              <TouchableOpacity
                onPress={passwordPrompt}
              >
                <Ionicons name='alert-circle-outline' size={18} style={{color: colors.black, marginLeft: 4}} />
              </TouchableOpacity>
            </View>

             {/* cofirm password */}
            <View style={styles.inputBox}>
              <Ionicons name='lock-closed-outline' size={20} style={styles.icons} />
              <TextInput
                ref={conPassInputRef}
                placeholder='Confirm Password'
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text)=>SetcPass(text)}
              />

              {
                cPass !== "" && password === cPass ? (
                  isConfirmPasValid = 1,
                  <Ionicons name='checkmark-circle-outline' size={20} style={{color: colors.orange, position: 'absolute', right: 15}}/>
                ):(
                  isConfirmPasValid = 0,
                  <Ionicons name='close-circle-outline' size={20} style={{color: colors.red, position: 'absolute', right: 15}}/>
                )
              }

            </View>   
          

            <TouchableOpacity 
              onPress={handleSignUp}
              style={styles.RegisterButton}
            >
              <Text style={{ fontSize: 20, color: colors.black, fontFamily: 'NotoSansMono-Bold' }}>Register</Text>
            </TouchableOpacity>

            
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollview: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    marginHorizontal: 22,
    marginBottom: 10
  },

  heading: {
    fontFamily: 'Acme-Regular',
    fontSize: 25,
    color: colors.black
  },

  logo: {
    height: 180,
    width: 300,
    resizeMode: 'contain'
  },

  register: {
    fontFamily: 'ReemKufi-Bold',
    fontSize: 45
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff6e6',
    borderRadius: 50, // Adjust the value as needed
    padding: 8,
    marginBottom: 20,
  },

  textInput: {
    width: '100%',
    color: colors.gray,
    marginHorizontal: 5
  },

  icons: {
    color: colors.orange,
    marginLeft: 8
  },

  RegisterButton: {
    height: 50,
    width: '100%',
    borderRadius: 50, // Adjust the value as needed
    padding: 8,
    backgroundColor: colors.orange,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default SignUp