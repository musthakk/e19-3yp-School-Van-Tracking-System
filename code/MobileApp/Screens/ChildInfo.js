import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';

import colors from '../constants/colors';

const ChildInfo = ({ navigation, route }) => {

    const { name, age, school, grade, pickupAdd, vehicleID, agency, profileAvatar, isVerified, clrIndex } = route.params;

    // api call to delete a child..
    const deleteTheChild = async () => {
        try {

            // get username of the user from the SecureStore.
            const username = await SecureStore.getItemAsync('username');

            const response = await fetch(`https://13.126.69.29:3000/children/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                })
            });

            if (!response.ok) {
                throw new Error('Child deletion failed');
            }

            const data = await response.json();
            console.log("deleted..");
            return data;
        } catch (error) {
            console.error('Failed to delete child:', error);
        }
    };


    // Delete call implementation..
    const manageDelete = async () => {
        Alert.alert('Delete Child', 'Are you sure you want to delete this child?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    console.log("deleted..");
                    await deleteTheChild();
                    navigation.replace('userNavScreen', { screen: 'childrenData' });
                },
            },
        ]);
    };


    // Pre-define some profile avatars for the children
    const childProfileImages = {
        'boy1.png': require('../assets/childProfiles/boy1.png'),
        'boy2.png': require('../assets/childProfiles/boy2.png'),
        'boy3.png': require('../assets/childProfiles/boy3.png'),
        'boy4.png': require('../assets/childProfiles/boy4.png'),
        'boy5.png': require('../assets/childProfiles/boy5.jpg'),
        'boy6.png': require('../assets/childProfiles/boy6.png'),
        'boy7.png': require('../assets/childProfiles/boy7.png'),
        'girl1.png': require('../assets/childProfiles/girl1.jpg'),
        'girl2.png': require('../assets/childProfiles/girl2.png'),
        'girl3.png': require('../assets/childProfiles/girl3.png'),
        'girl4.png': require('../assets/childProfiles/girl4.png'),
        'girl5.png': require('../assets/childProfiles/girl5.png'),
        'girl6.png': require('../assets/childProfiles/girl6.png'),
        'girl7.png': require('../assets/childProfiles/girl7.png'),
        'girl8.png': require('../assets/childProfiles/girl8.png'),
        'girl9.png': require('../assets/childProfiles/girl9.png'),
    }

    // color backgrounds for children Details container..
    let colorsArray = [colors.lightTeal, colors.lightOrangeMui, colors.lightLime, colors.lightBluemui, colors.lightBrown];


    return (

        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <View
                style={{ ...styles.childCard, backgroundColor: colorsArray[clrIndex] }}
            >

                {/* chile profile avatar png */}
                <View style={styles.childAvatarContainer}>
                    <Image source={childProfileImages[profileAvatar]} style={styles.childAvatar} />
                </View>


                {/* Information about the child */}
                <View style={{ marginTop: 20, }}>
                    {/* children name */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>Name: </Text>
                        <Text style={styles.DetailData}>{name}</Text>
                    </View>

                    {/* Age */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>Age: </Text>
                        <Text style={styles.DetailData}>{age}</Text>
                    </View>

                    {/* School */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>School: </Text>
                        <Text style={styles.DetailData}>{school}</Text>
                    </View>

                    {/* grade */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>Grade: </Text>
                        <Text style={styles.DetailData}>{grade}</Text>
                    </View>

                    {/* pickup Address */}
                    <View
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text style={styles.DetailPrompt}>Pickup Address: </Text>
                        <Text
                            style={{
                                marginLeft: 20,
                                color: colors.black,
                                fontFamily: 'Outfit-Regular',
                                fontSize: 20,
                            }}
                        >
                            {pickupAdd}
                        </Text>
                    </View>

                    {/* Agency */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>Agency: </Text>
                        <Text style={styles.DetailData}>{agency}</Text>
                    </View>

                    {/* Vehicle ID */}
                    <View style={styles.singleDetailBlock}>
                        <Text style={styles.DetailPrompt}>Vehicle ID: </Text>
                        <Text style={styles.DetailData}>{vehicleID}</Text>
                    </View>


                </View>

                {/* indication symbol saying child is verified by the admin */}
                {
                    (isVerified) ? (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: colors.white,
                                position: 'absolute',
                                right: 15,
                                borderRadius: 20,
                                padding: 5,
                                paddingHorizontal: 10,
                                backgroundColor: colors.darkGreen,
                                marginTop: 10,
                            }}
                        >
                            Verified
                        </Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: colors.white,
                                position: 'absolute',
                                right: 15,
                                borderRadius: 20,
                                padding: 5,
                                paddingHorizontal: 10,
                                backgroundColor: colors.red,
                                marginTop: 10,
                            }}
                        >
                            Not Verified
                        </Text>)
                }

                <TouchableOpacity style={styles.deleteButton} onPress={manageDelete} >
                    <Text style={{ fontSize: 20, fontFamily: 'Outfit-Bold', color: colors.white }}>Delete</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    childCard: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 25,
    },

    childAvatarContainer: {
        height: 115,
        width: 115,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.red,
        borderRadius: 60,
        alignSelf: 'center',

    },

    childAvatar: {
        height: 110,
        width: 110,
        borderRadius: 80,
    },

    singleDetailBlock: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    DetailPrompt: {
        marginLeft: 20,
        color: colors.black,
        fontFamily: 'Outfit-Bold',
        fontSize: 18,
    },

    DetailData: {
        marginLeft: 5,
        color: colors.black,
        fontFamily: 'Outfit-Regular',
        fontSize: 20,
    },

    deleteButton: {
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: colors.red,
        borderRadius: 20,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        alignSelf: 'center'
    }


});




export default ChildInfo