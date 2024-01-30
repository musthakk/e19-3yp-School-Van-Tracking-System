import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import colors from '../constants/colors';

import {Ionicons, MaterialIcons} from '@expo/vector-icons'

const Login = ({navigation}) => {

    // Tracking username..
    const [username, setUsername] = useState("");

    // Track Password..
    const [password, SetPassword] = useState("");

    // Tracking Password visibility..
    const [isPasswordShown, SetPasswordShown] = useState(false);

    // Function to check if the user is already logged in
    const checkLoggedIn = async () => {
        try {
            // Retrieve the JWT token from SecureStore
            const jwtToken = await SecureStore.getItemAsync('jwtToken');
        
            // Return true if the token exists, false otherwise
            return !!jwtToken;
        } catch (error) {
            console.error('Error checking login state:', error);
            return false;
        }
    };

    // Login Authentication..
    const handleLogin = async () => {
        try {
            const response = await fetch('http://13.126.69.29:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                // Handle non-successful response
                throw new Error('Invalid username or password.');
            }

            const responseData = await response.json();
            const jwtToken = responseData.token;
            const identity = responseData.identification;    // user or driver..

            // Save the token securely using expo-secure-store
            await SecureStore.setItemAsync('jwtToken', jwtToken);

            await SecureStore.setItemAsync('identity', identity.toString());      // storing user role inside the system

            await SecureStore.setItemAsync('username', username.toString());      // storing username..

            // Navigate to the next screen or perform other actions
            if(identity === "driver")
            {
                // navigate to driver Home..
                navigation.navigate('driverNavScreen')
            } 
            else{

                // navigate to userHomeScreen..
                navigation.navigate('userNavScreen');
            }
            

        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    };

    // Check login state and navigate accordingly
    const checkLoginAndNavigate = async () => {
        const isLoggedIn = await checkLoggedIn();

        const identity = await SecureStore.getItemAsync('identity');

        if(identity === 'driver')
        {
            // add your driver login page 
            const initialRoute = isLoggedIn ? 'driverNavScreen' : 'login';

            navigation.navigate(initialRoute);

        }else{

            const initialRoute = isLoggedIn ? 'userNavScreen' : 'login';

            navigation.navigate(initialRoute);
        }
        
    };
    
    // Call checkLoginAndNavigate when the app starts
    useEffect(() => {
        checkLoginAndNavigate();
    }, []);


    // Element References..
    const passwordRef = useRef(null);
    const LoginButtonRef = useRef(null);
    
    return (
    <SafeAreaView style = {styles.safearea}>
        <View style ={styles.container}>

            <View style={{marginVertical: 50}}>
                <Text style={styles.heading}><Ionicons name='location-outline' color={colors.red} size={25}/>Sure<Text>Way..</Text></Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Image
                    source={require('../assets/SureWayLogo.png')}
                    style = {styles.logo}
                />

                <Text style={styles.login}>LOGIN</Text>
            </View>
            
            <View style={styles.inputBox}>
                <Ionicons name='person-circle-outline' size={20} style={styles.icons}/>
                <TextInput
                    placeholder='username'
                    style = {styles.textInput}
                    onChangeText={(text)=>setUsername(text)}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                />
            </View>

            <View style={styles.inputBox}>
                <Ionicons name='lock-closed-outline' size={20} style={styles.icons}/>
                <TextInput
                    ref={passwordRef}
                    placeholder='Password'
                    secureTextEntry = {!isPasswordShown}
                    style = {styles.textInput}
                    onChangeText={(text)=>SetPassword(text)}
                    onSubmitEditing={()=>LoginButtonRef.current.focus()}
                />

                <TouchableOpacity 
                    onPress={()=>SetPasswordShown(!isPasswordShown)}    // set the inputted password field to be hided..
                    style={{position: 'absolute', right: 15}}
                >
                    {
                        isPasswordShown == true ? (
                            <Ionicons name='eye-off' size={20} style={{color: colors.black}}/>
                        ): 
                        <Ionicons name='eye' size={20} style={{color: colors.black}}/>
                    }
                    
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                ref={LoginButtonRef}
                style={styles.submitButton}
                onPress={handleLogin}
            >
                <Text style={{fontSize: 20, color:colors.black, fontFamily: 'NotoSansMono-Bold'}}>Login</Text>
            </TouchableOpacity>
            

            
            <View style={styles.signupPrompt}>
                <Text style={styles.signupText}>Not Registered ?</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("SignUp")}
                >
                    <Text style={styles.signup}>Create account</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    safearea: {
        flex: 1,
        backgroundColor: colors.white
    },

    container: {
        flex: 1,
        marginHorizontal: 22,
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

    login: {
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

    submitButton: {
        height: 50,
        width: '100%',
        borderRadius: 50, // Adjust the value as needed
        padding: 8,
        backgroundColor: colors.orange,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    signupPrompt: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 100
    },

    signupText:{
        fontFamily:'Ramabhadra-Regular'
    },

    signup:{
        marginLeft: 5,
        fontFamily:'Ramabhadra-Regular',
        color: colors.orange,
    }

});

export default Login