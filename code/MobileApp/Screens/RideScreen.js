import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const RideScreen = () => {

    // hold driver username,
    const [username, setUsername] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState({});
    const [childenDetails, setchildrenDetails] = useState([])


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
            
            console.log(vehicleProgressInfo);
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>



            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RideScreen