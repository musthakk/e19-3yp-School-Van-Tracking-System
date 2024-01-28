// AppNavigator.js
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';


// import screens..
import UserHome from './UserHomePage';
import ChildrenData from './ChildrenData';

import colors from '../constants/colors';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { 
                height: 60,
                marginHorizontal: 8,
                marginBottom: 10,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                elevation: 0,
                borderTopWidth: 0,
            },
            tabBarItemStyle: { marginVertical: 5},
            tabBarActiveTintColor: colors.black,
            tabBarShowLabel: false,
        }}
    >

      {/* userHome */}
      <Tab.Screen 
        name="Home" 
        component={UserHome} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused})=>(
            <View style={{borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4, alignItems: 'center',}}>
              <Ionicons name={focused ? 'location-sharp': 'location-outline'} size={30} color={focused?'black': 'gray'}/>
              <Text
              style={{
                fontFamily: focused? 'Outfit-Bold': 'Outfit-Regular',
              }}
              >
                Track
              </Text>
            </View>
          )
        }}

      />

      {/* profile Page */}
      <Tab.Screen 
        name="childrenData" 
        component={ChildrenData}
        options={{ 
          tabBarIcon: ({focused})=>(
            <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4, alignItems: 'center',}}>
              <Ionicons name={focused ? "people-sharp" : "people-outline"} size={30} color={focused ? 'black' : 'gray'} />
              <Text
              style={{
                fontFamily: focused? 'Outfit-Bold': 'Outfit-Regular',
              }}
              >
                Children
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
              Children Details
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

  );
};

export default AppNavigator;
