// AppNavigator.js
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from './UserHome';
import colors from '../constants/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import UserProfile from './UserProfile';

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
            <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4}}>
              <Ionicons name={focused ? 'location-sharp': 'location-outline'} size={30} color={focused?'black': 'gray'}/>
            </View>
          )
        }}
      />

      {/* profile Page */}
      <Tab.Screen 
        name="Profile" 
        component={UserProfile} 
        options={{ 
          tabBarIcon: ({focused})=>(
            <View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: 'black', paddingBottom: 4}}>
              <Ionicons name={focused ? "person" : "person-outline"} size={30} color={focused ? 'black' : 'gray'} />
            </View>
          ),
          headerTitle: () => (
            <Text
              style={{
                  fontSize: 35,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 10,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>

  );
};

export default AppNavigator;
