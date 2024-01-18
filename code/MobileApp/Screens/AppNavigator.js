// AppNavigator.js
import React from 'react';
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
                borderRadius: 40,
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
              <Ionicons name={focused ? 'location-sharp': 'location-outline'} size={30} color={focused?'black': 'gray'}/>
            )
        }}
      />

      {/* profile Page */}
      <Tab.Screen 
        name="UserProfile" 
        component={UserProfile} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused})=>(
              <Ionicons name={focused ? "person": "person-outline"} size={30} color={focused?'black': 'gray'}/>
            )
        }}
      />
    </Tab.Navigator>

  );
};

export default AppNavigator;
