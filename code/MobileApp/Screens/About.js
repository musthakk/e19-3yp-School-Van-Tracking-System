import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors'
import { version } from 'react/cjs/react.production.min'

const About = () => {
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/SureWayLogo.png')}
                    style={{
                        height: 350,
                        width: 350,
                        resizeMode: 'contain',
                    }}
                />
            </View>

            <View style={styles.headingContainer}>
                <Text style={styles.heading}><Ionicons name='location-outline' color={colors.red} size={40}/>SureWay..</Text>
            </View>

            <Text style={styles.version}>
                Version 1.0
            </Text>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea:{
        flex: 1,
        backgroundColor: colors.white,
    },

    container:{
        flex: 1,
        marginHorizontal: 10,
        marginTop: -10,
    },

    logoContainer:{
        alignItems: 'center',
    },

    headingContainer:{
        marginTop: -40,
    },

    heading: {
        fontSize: 40,
        fontFamily: 'Acme-Regular',
        marginLeft: 75,
    },
    
    version:{
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 18,
        borderRadius: 20,
        backgroundColor: colors.orange,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontFamily: 'Roboto-Regular',
    },

});

export default About