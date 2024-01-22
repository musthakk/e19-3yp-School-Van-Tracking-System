
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Screens
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

// Screens for Users
import AppNavigator from './Screens/AppNavigator';
import AddChild from './Screens/AddChild';

// Screens for Drivers
import DriverHome from './Screens/DriverHome';

import {Ionicons, MaterialIcons} from '@expo/vector-icons'


import MacondoRegular from "./assets/fonts/Macondo-Regular.ttf";
import AcmeRegular from "./assets/fonts/Acme-Regular.ttf";
import PridiRegular from "./assets/fonts/Pridi-Regular.ttf";
import NotoSansMonoBold from "./assets/fonts/NotoSansMono-Bold.ttf";
import ReemKufiBold from './assets/fonts/ReemKufi-Bold.ttf';
import RamabhadraRegular from './assets/fonts/Ramabhadra-Regular.ttf';
import OutfitBold from './assets/fonts/Outfit-Bold.ttf';
import OutfitRegular from './assets/fonts/Outfit-Regular.ttf';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';


const Stack = createNativeStackNavigator(); // Initialize the native navigation stack..


export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Macondo-Regular': MacondoRegular,
    'Acme-Regular': AcmeRegular,
    'Pridi-Regular': PridiRegular,
    'NotoSansMono-Bold': NotoSansMonoBold,
    'ReemKufi-Bold': ReemKufiBold,
    'Ramabhadra-Regular': RamabhadraRegular,
    'Outfit-Bold': OutfitBold,
    'Outfit-Regular': OutfitRegular,
    'Roboto-Regular': RobotoRegular,

  });

  if(!fontsLoaded)
  {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
      >

        {/* Login Screen */}
        <Stack.Screen 
          name='login' 
          component={Login}
          options={{ headerShown: false }}  
        />

        {/* SignUp Screen */}
        <Stack.Screen 
          name='SignUp' 
          component={SignUp}
          options={{ headerShown: false }} 
        />  

        {/* DriverHome Screen */}
        <Stack.Screen 
          name='driverHome' 
          component={DriverHome}
          options={{ headerShown: false }} 
        />  


        {/* Screens with Bottom NavBar for Users.. It contains pges which are at the bottom navBar */}
        <Stack.Screen
          name='userNavScreen'
          component={AppNavigator}
          options={{headerShown: false}}
        />

        {/* Add child screen for adding children inside the user Account */}
        <Stack.Screen
          name='addChild'
          component={AddChild}
          options={{
            headerTitle: () => (
              <Text
                style={{
                    fontSize: 35,
                    fontFamily: 'Outfit-Bold'
                }}
              >
                ADD CHILD
              </Text>
            ),
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

