import { View, Text, SafeAreaView, StyleSheet, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const RideScreen = () => {

    // To implement searchBar functionalitty on studentList.. so track of the input values..
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [clearSearch, setClearSearch] = useState(true);

    // hold driver username,
    const [username, setUsername] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState({});
    const [childrenDetails, setchildrenDetails] = useState([])

    const [travelStatus, setTravelStatus] = useState(-1);

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
            const result = await response.json();     // vehicle information..

            // set the vehicle status varibale to hold the travellling status of the vehicle..
            setVehicleStatus(result.vehicleInfo);

            // extract the children array from the vehicleProgressInfo..
            // It's the list of the assigned children under a specific vehicle.
            setchildrenDetails(result.childrenDetails);

            // set travelling status,.. it's the most important variable..
            setTravelStatus(result.vehicleInfo.travellingStatus);

        } catch (error) {
            Alert.alert('Error in fetching the Vehicle status', error.message);
        }
    };


    // indicating user's that travelling has been started.. by changing parameter in vehicle collection..
    const requestStart = async () => {

        try {
            const response = await fetch('http://13.126.69.29:3000/travelStartAction', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username
                }),
            });

            if (!response.ok) {
                // Handle non successfull response
                throw new Error('Server Error.');
            }

            const data = await response.json();

            if (data.success) {
                console.log(data.message);
            } else {
                console.error('Update failed:', data.message);
            }
        }
        catch (error) {
            Alert.alert('Error during update of travelStart:', error.message);
        }
    };



    // render children as a list by putting inside an array..
    let childrenData = childrenDetails.map((child, index) => (

        <View style={styles.singleChild} key={index}>

            {/* Text */}
            <View style={styles.childText}>
                <Text style={styles.chlidName}>{child.name}</Text>
                <Text style={styles.fatherName}>{child.parent_fullName}</Text>
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

    // function to handle the search of the child..
    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            const results = childrenDetails.filter(child =>
                child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                child.parent_fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
        setClearSearch(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            // Call the function immediately
            getVehicleInfo();
        }, [])
    );


    // reference..
    const searchRef = useRef(null);

    return (

        <SafeAreaView style={{ flex: 1, marginTop: 5, }}>
            <View style={styles.container}>
                <Text
                    style={{
                        borderRadius: 10,
                        backgroundColor: colors.black,
                        textAlign: 'center',
                        color: colors.white,
                        width: '50%',
                        alignSelf: 'center',
                        marginTop: 5,
                        paddingVertical: 3,
                        fontSize: 14,
                        fontFamily: 'Outfit-Regular',
                        marginBottom: 5,
                    }}
                >
                    Total Children Count: {childrenDetails.length}
                </Text>

                <View style={styles.innerTopContainer}>

                    {
                        (travelStatus === 1) && <View style={styles.searchBarContainer}>
                            {/* seachBox */}
                            <TextInput
                                style={styles.searchBar}
                                value={searchTerm}
                                onChangeText={(text) => {
                                    setSearchTerm(text);
                                    handleSearch(text);
                                }}
                                placeholder="Search child"
                                onSubmitEditing={() => searchRef.current.focus()}

                            />

                            {/* search Button */}
                            <TouchableOpacity style={styles.searchButton} ref={searchRef} onPress={() => { handleSearch(); setSearchTerm("") }}>
                                <Text style={styles.search}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* render search Result */}
                    {(!clearSearch) && searchResults.map((child, index) => (
                        <View key={index} style={{ marginTop: 20, width: '100%', backgroundColor: colors.lightBlue }}>
                            <View style={{ ...styles.singleChild, width: '100%' }}>
                                {/* Text */}
                                <View style={styles.childText}>
                                    <Text style={styles.chlidName}>{child.name}</Text>
                                    <Text style={styles.fatherName}>{child.parent_fullName}</Text>
                                </View>

                                {/* Icons */}
                                <View style={styles.IconContainer}>
                                    {/* present */}
                                    <TouchableOpacity style={styles.Icons}>
                                        <Ionicons name='checkmark-circle' size={50} color={colors.red} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    {(!clearSearch) &&
                        <TouchableOpacity
                            style={{ marginTop: 10, }}
                            onPress={() => setClearSearch(true)}
                        >
                            <Text style={{ fontFamily: 'Roboto-Regular' }}>clear</Text>
                        </TouchableOpacity>
                    }



                    {(travelStatus === 0) &&
                        <TouchableOpacity style={styles.startButton} onPress={() => requestStart()}>
                            <Text style={{ fontSize: 40, fontFamily: "Roboto-Bold" }}>start</Text>
                        </TouchableOpacity>
                    }

                </View>

                {(travelStatus === 1) &&
                    <ScrollView
                        contentContainerStyle={styles.childrenList}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {childrenData}

                        <TouchableOpacity style={styles.FinishButton} onPress={() => setTravelStatus(0)}>
                            <Text style={{ fontSize: 40, fontFamily: "Roboto-Bold", color: colors.white }}>Finish</Text>
                        </TouchableOpacity>

                    </ScrollView>
                }





            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    innerTopContainer: {
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },

    startButton: {
        backgroundColor: colors.orange,
        height: 70,
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        position: 'absolute',
        top: 240,
    },

    FinishButton: {
        backgroundColor: colors.black,
        height: 70,
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 30,
    },

    searchBarContainer: {
        flexDirection: 'row',
    },

    searchBar: {
        height: 45,
        width: '71%',
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingLeft: 15,
        fontSize: 14,


        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 8,
    },

    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        marginLeft: 8,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },

    search: {
        color: colors.white,
        fontSize: 15,
        paddingHorizontal: 18,
    },

    rideDecision: {
        height: '100%',
    },

    childrenList: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: colors.lightBlue,
        paddingTop: 20,
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
        fontSize: 14,
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