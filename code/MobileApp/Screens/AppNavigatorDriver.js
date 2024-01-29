import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Import colors custom module..
import colors from '../constants/colors';

// Import Screens
import DriverHome from './DriverHome';
import RouteScreen from './RouteScreen';
import DriverProfile from './DriverProfile';

const Tab = createBottomTabNavigator();


const AppNavigatorDriver = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 65,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    elevation: 0,
                    borderTopWidth: 0,
                    paddingBottom: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                tabBarItemStyle: { marginVertical: 5 },
                tabBarActiveTintColor: colors.black,
                tabBarShowLabel: false,
            }}
        >

            {/* driverHome */}
            <Tab.Screen
                name="driverHome"
                component={DriverHome}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4, alignItems: 'center', }}>
                            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={30} color={focused ? 'black' : 'gray'} />
                            <Text
                                style={{
                                    fontFamily: focused ? 'Outfit-Bold' : 'Outfit-Regular',
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    )
                }}

            />

            {/* route Page */}
            <Tab.Screen
                name="routeScreen"
                component={RouteScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4, alignItems: 'center', }}>
                            <Ionicons name={focused ? "navigate" : "navigate-outline"} size={30} color={focused ? 'black' : 'gray'} />
                            <Text
                                style={{
                                    fontFamily: focused ? 'Outfit-Bold' : 'Outfit-Regular',
                                }}
                            >
                                Route
                            </Text>
                        </View>
                    ),
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 35,
                                fontFamily: 'Outfit-Regular',
                                alignSelf: 'center'
                            }}
                        >
                            Route
                        </Text>
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: {
                        borderBottomWidth: 1,
                        borderBottomColor: colors.gray,
                    }
                }}
            />


            {/* profile Page */}
            <Tab.Screen
                name="driverProfile"
                component={DriverProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4, alignItems: 'center', }}>
                            <Ionicons name={focused ? "person-sharp" : "person-outline"} size={30} color={focused ? 'black' : 'gray'} />
                            <Text
                                style={{
                                    fontFamily: focused ? 'Outfit-Bold' : 'Outfit-Regular',
                                }}
                            >
                                Profile
                            </Text>
                        </View>
                    ),
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 35,
                                fontFamily: 'Outfit-Bold',
                                alignSelf: 'center'
                            }}
                        >
                            Profile
                        </Text>
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: {
                        borderBottomWidth: 1,
                        borderBottomColor: colors.gray,
                    }
                }}
            />


        </Tab.Navigator>

    )
}

export default AppNavigatorDriver