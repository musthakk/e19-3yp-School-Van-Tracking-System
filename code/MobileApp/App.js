
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './constants/colors';

// import Screens
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

// Screens for Users
import AppNavigator from './Screens/AppNavigator';
import AddChild from './Screens/AddChild';
import UserProfile from './Screens/UserProfile';
import ChildInfo from './Screens/ChildInfo';

// Screens for Drivers
import DriverHome from './Screens/DriverHome';

// GoogleMap API screen
import MapScreen from './Screens/MapScreen';

// About SureWay
import About from './Screens/About';

import { Ionicons, MaterialIcons } from '@expo/vector-icons'


import MacondoRegular from "./assets/fonts/Macondo-Regular.ttf";
import AcmeRegular from "./assets/fonts/Acme-Regular.ttf";
import PridiRegular from "./assets/fonts/Pridi-Regular.ttf";
import NotoSansMonoBold from "./assets/fonts/NotoSansMono-Bold.ttf";
import ReemKufiBold from './assets/fonts/ReemKufi-Bold.ttf';
import RamabhadraRegular from './assets/fonts/Ramabhadra-Regular.ttf';
import OutfitBold from './assets/fonts/Outfit-Bold.ttf';
import OutfitRegular from './assets/fonts/Outfit-Regular.ttf';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';
import RobotoBold from './assets/fonts/Roboto-Bold.ttf';

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
    'Roboto-Bold': RobotoBold,

  });

  if (!fontsLoaded) {
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
          options={{ headerShown: false }}
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

        {/* userProfile */}
        <Stack.Screen
          name='userProfile'
          component={UserProfile}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 35,
                  fontFamily: 'Outfit-Bold'
                }}
              >
                Profile
              </Text>
            ),
          }}
        />

        {/* About */}
        <Stack.Screen
          name='about'
          component={About}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 35,
                  fontFamily: 'Outfit-Bold'
                }}
              >
                About
              </Text>
            ),
          }}
        />

        {/* Map Screen */}
        <Stack.Screen
          name='mapScreen'
          component={MapScreen}
          options={{ headerShown: false }}
        />

        {/* Child Info */}
        <Stack.Screen
          name='childInfo'
          component={ChildInfo}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 35,
                  fontFamily: 'Outfit-Regular',
                  alignSelf: 'center'
                }}
              >
                Child Info
              </Text>
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
            }
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

