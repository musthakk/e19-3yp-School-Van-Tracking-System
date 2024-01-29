import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

// import custom color module..
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const DriverProfile = ({ navigation }) => {

    // handling log out functionality..
    const handleLogout = async () => {
        // Clear the token from SecureStore
        await SecureStore.deleteItemAsync('jwtToken');

        // clear user details..
        await SecureStore.deleteItemAsync('identity');

        await SecureStore.deleteItemAsync('username');

        // Navigate back to the login screen
        navigation.replace('login');
    };


    const [nameLetterAvatar, setNameLetterAvatar] = useState("");
    const [fullName, SetfullName] = useState("");
    const [username, setUsername] = useState('');
    const [driverDetails, setDriverDetails] = useState({});


    // onStart of this userProfile page, send username to the backend and from there get and show his details..
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

        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>

                {/* user profile Image with his name portions first letter */}
                <View style={{ alignItems: 'center', marginTop: -28, }}>
                    <View
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 80,
                            backgroundColor: colors.black,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 45, fontFamily: 'Roboto-Bold', color: colors.white }}>{nameLetterAvatar}</Text>
                    </View>
                </View>


                {/* user details */}
                <View style={styles.userdetailsContainer}>

                    {/* Full Name */}
                    <View style={styles.userdetailsInnerContainer}>

                        <Ionicons name='person-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Full-name</Text>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.dataText}>{driverDetails.firstName + " " + driverDetails.lastName}</Text>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        borderRadius: 15,
                                        backgroundColor: colors.gold,
                                        paddingHorizontal: 10,
                                        textAlign: 'center',
                                        paddingVertical: 1,
                                        fontFamily: "Roboto-Bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    Driver
                                </Text>

                            </View>
                        </View>

                    </View>


                    {/* user name */}
                    <View style={styles.userdetailsInnerContainer}>
                        <Ionicons name='person-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Username</Text>
                            <Text style={styles.dataText}>{username}</Text>
                        </View>

                    </View>

                    {/* Contact Number */}
                    <View style={styles.userdetailsInnerContainer}>
                        <Ionicons name='call-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Phone</Text>
                            <Text style={styles.dataText}>{driverDetails.contactNumber}</Text>
                        </View>

                    </View>

                    {/* Email */}
                    <View style={styles.userdetailsInnerContainer}>
                        <Ionicons name='mail-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Mail</Text>
                            <Text style={styles.dataText}>{driverDetails.email}</Text>
                        </View>
                    </View>

                    {/* Agency */}
                    <View style={styles.userdetailsInnerContainer}>
                        <Ionicons name='mail-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Agency</Text>
                            <Text style={styles.dataText}>{driverDetails.agency}</Text>
                        </View>
                    </View>

                    {/* Agency */}
                    <View style={styles.userdetailsInnerContainer}>
                        <Ionicons name='mail-outline' size={22} style={{ color: colors.gray }} />

                        <View style={styles.detailsTextContainer}>
                            <Text style={styles.promptText}>Assigned Vehicle: </Text>
                            <Text style={styles.dataText}>{driverDetails.assignedVehicle}</Text>
                        </View>
                    </View>


                    {/* Logout button  */}

                    <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5, marginTop: 10, marginBottom: 50, }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 15, }}>Log out</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },

    container: {
        flex: 1,
        marginHorizontal: 28,
    },

    userdetailsContainer: {
        marginTop: 25,
    },

    userdetailsInnerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        alignItems: 'center',
        paddingBottom: 12,
        marginBottom: 11,
    },

    detailsTextContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },

    promptText: {
        color: colors.gray,
        fontSize: 14,
    },

    dataText: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16
    },

    editorContainer: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
        width: '100%',
        height: 120,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },


})

export default DriverProfile