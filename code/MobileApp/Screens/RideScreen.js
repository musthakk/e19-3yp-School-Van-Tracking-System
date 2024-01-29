import { View, Text, SafeAreaView, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const RideScreen = () => {

    // hold driver username,
    const [username, setUsername] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState({});
    const [childrenDetails, setchildrenDetails] = useState([])


    // onStart of this userProfile page, send username to the backend and from there get and show his details..
    const getVehicleInfo = async () => {
        try {
            // get username of the user from the SecureStore.
            let username = await SecureStore.getItemAsync('username');
            setUsername(username);

            const response = await fetch(`http://13.126.69.29:3000/getVehicleInfo?username=${username}`, {
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
            const vehicleProgressInfo = await response.json();     // vehicle information..

            // set the vehicle status varibale to hold the travellling status of the vehicle..
            setVehicleStatus(vehicleProgressInfo);

            // extract the children array from the vehicleProgressInfo..
            // It's the list of the assigned children under a specific vehicle.
            setchildrenDetails(vehicleProgressInfo.Children);

        } catch (error) {
            Alert.alert('Error in fetching the driver data', error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Call the function immediately
            getVehicleInfo();
        }, [])
    );

    let childrenData = childrenDetails.map((child, index) => (

        <View style={styles.singleChild} key={index}>

            {/* Text */}
            <View style={styles.childText}>
                <Text style={styles.chlidName}>{child.substring(0, child.lastIndexOf(" "))}</Text>
                <Text style={styles.fatherName}>Father: {child.substring(child.lastIndexOf(" ") + 1)}</Text>
            </View>

            {/* Icons */}
            <View style={styles.IconContainer}>
                {/* present */}
                <TouchableOpacity style={styles.Icons}>
                    <Ionicons name='checkmark-circle' size={50} color={colors.red} />
                </TouchableOpacity>

            </View>

        </View>

    ));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View>

                </View>

                <ScrollView contentContainerStyle={styles.childrenList}>

                {childrenData}


                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    childrenList: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    singleChild: {
        flexDirection: 'row',
        height: 70,
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 8,

    },

    childText: {
        marginLeft: 20,
    },

    chlidName: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
    },

    fatherName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.gray,
    },


    IconContainer: {
        position: 'absolute',
        right: 7,
        flexDirection: 'row',

    },

    Icons: {
        paddingRight: 20,
        borderLeftWidth: 1,
        borderLeftColor: colors.black,
        paddingLeft: 20,
    }


});

export default RideScreen