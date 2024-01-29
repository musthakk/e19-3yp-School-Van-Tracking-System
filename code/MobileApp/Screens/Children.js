import { View, Text, ScrollView, StyleSheet, RefreshControl, Image, Alert, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';


// import cusom colors module..
import colors from '../constants/colors';



const Children = ({navigation}) => {

    // refresh control..
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getChildrenDetails();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    // track children details of the user..
    const [childrenDetails, setchildrenDetails] = useState([]);

    // onStart of this page, send username to the backend and from there get the children Details..
    const getChildrenDetails = async () => {

        try {
            // get username of the user from the SecureStore.
            username = await SecureStore.getItemAsync('username');

            const response = await fetch('http://13.126.69.29:3000/getUserAndChildrenInfo', {
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
            const userAndChildrenDetails = await response.json();     // full name of ther user.. and children details..

            setchildrenDetails(userAndChildrenDetails.childrenDetails);

        } catch (error) {
            Alert.alert('Error in fetching the children data', error.message);
        }

    };


    useFocusEffect(
        React.useCallback(() => {
          // Call the function immediately
          getChildrenDetails();
    
        }, [])
      );


    // navigate to childDetail page, 
    const showDetailPage = (name, age, school, grade, pickupAdd, vehicleID, agency, profileAvatar, isVerified, clrIndex)=>{
        navigation.navigate('childInfo', {name, age, school, grade, pickupAdd, vehicleID, agency, profileAvatar, isVerified, clrIndex})
    }



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


    let childrenData = childrenDetails.map((child, index) => (

        <TouchableOpacity
            key={index}
            style={{ ...styles.childTouchable, backgroundColor: colorsArray[index % 5] }}
            onPress={()=>showDetailPage(child.name, child.age, child.school, child.grade, 
                child.pickupAddress, child.vehicleID, child.agency, child.profileAvatar, child.verifiedStatus, index%5)}
        >

            {/* chile profile avatar png */}
            <View style={styles.childAvatarContainer}>
                <Image source={childProfileImages[child.profileAvatar]} style={styles.childAvatar} />
            </View>

            {/* Information about the child */}
            <View>
                {/* children name */}
                <View style={styles.singleDetailBlock}>
                    <Text style={styles.DetailData}>{child.name}</Text>
                </View>

            </View>

            {/* indication symbol saying child is verified by the admin */}
            {
                (child.verifiedStatus) ? (
                    <Ionicons name='checkmark-circle' size={50} style={{ color: colors.green, position: 'absolute', right: 15, }} />
                ) : (
                    <Ionicons name='checkmark-circle' size={50} style={{ color: colors.red, position: 'absolute', right: 15, }} />
                )
            }

        </TouchableOpacity>

    ));


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ScrollView
                style={{
                    flex: 1,
                    paddingVertical: 8,
                    marginBottom: 115,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {
                    childrenData.length === 0 ? (
                        <View
                            style={{
                                marginTop: 140,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={require('../assets/fileNotFound2.jpg')}
                                style={{ height: 300, width: 300, }}
                            />
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontFamily: 'Outfit-Regular',
                                }}
                            >
                                No children accounts found..
                            </Text>
                        </View>)
                        : (
                            <View
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                {childrenData}
                            </View>
                        )

                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    childTouchable: {
        flexDirection: 'row',
        height: 130,
        borderRadius: 30,
        width: '90%',
        alignSelf:'center',
        borderColor: colors.black,
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 18,
    },

    childAvatarContainer: {
        height: 95,
        width: 95,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
    },

    childAvatar: {
        height: 90,
        width: 90,
        borderRadius: 50,
    },

    singleDetailBlock: {
        flexDirection: 'row',

    },

    DetailData: {
        marginLeft: 20,
        color: colors.black,
        fontFamily: 'Outfit-Bold',
        fontSize: 22,
    },


});

export default Children