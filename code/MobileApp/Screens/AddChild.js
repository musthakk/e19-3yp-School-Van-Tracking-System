import { View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView, Platform} from 'react-native'
import React, { useRef, useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


// import custom module .js files
import colors from '../constants/colors';

// Import Icons,
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import { capitalize, isNumber } from 'lodash';


const AddChild = () => {


    const [agencyData, setAgencyData] = useState([]); // Store the agency data (name) 

    useEffect(() => {
        fetch('http://localhost:3000/getAgencyInfo')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setAgencyData(data); // Store the data in the state
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      }, []);


    // track state of the textInputs..
    const [childName, setChildName] = useState("");
    const [age, setAge] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [agency, setAgency] = useState("");


    // Pre-define some profile images for the children
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

    const keys = Object.keys(childProfileImages);

    // Track the profile images..
    const [selectedProfileImg, setSelectedProfileImg] = useState('boy5.png');
    // arrow visibility of changing the profile image in right direction..
    const [rightArrowVisibility, SetRightArrowVisibility] = useState(1);
    // arrow visibility of changing the profile image in left direction..
    const [leftArrowVisibility, SetLeftArrowVisibility] = useState(1);

    // change profile pic in right direction
    const selectRight = ()=>{
        let index = keys.indexOf(selectedProfileImg);

        if (index < keys.length-1)
        {
            setSelectedProfileImg(keys[++index]);
            SetLeftArrowVisibility(1);
        }

        if(index === keys.length-1)
            SetRightArrowVisibility(0);
    }

    // change profile pic in left direction
    const selectLeft = ()=>{
        let index = keys.indexOf(selectedProfileImg);

        if (index > 0)
        {
            setSelectedProfileImg(keys[--index]);
            SetRightArrowVisibility(1);
        }

        if(index == 0)
            SetLeftArrowVisibility(0);
    }

    // define input reference variables..
    const ageInputRef = useRef(null);
    const schoolInputRef = useRef(null);
    const gradeInputRef = useRef(null);
    const pickupAddressInputRef = useRef(null);
    const agencyInputRef = useRef(null);
    
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>

        
            {/* child profile pic */}
            <View
                style = {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity onPress={selectLeft}>
                    <Ionicons name='chevron-back-outline' size={50} style={{opacity: leftArrowVisibility }}/>
                </TouchableOpacity>

                <Image source={childProfileImages[selectedProfileImg]} style={styles.childProfileAvatar}/>
                
                <TouchableOpacity onPress={selectRight}>
                    <Ionicons name='chevron-forward-outline' size={50} style={{opacity: rightArrowVisibility}}/>
                </TouchableOpacity>
            </View>
                    
            
            {/* ADD CHILD FORM */}
            <KeyboardAvoidingView
                style={{flex: 1,}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.scrollview}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    {/* userInput Field */}
                
                    {/* Name with Initials*/}
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder='Name of your child (with initials)'
                            style={styles.textInput}
                            onChangeText={(text)=>setChildName(text)}
                            onSubmitEditing={()=>ageInputRef.current.focus()}
                        />

                        {/* Validate child name input */}
                        {
                            childName.includes('.')? 
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>


                    {/* Age */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={ageInputRef}
                            placeholder='Age'
                            keyboardType='numeric'
                            style={styles.textInput}
                            onChangeText={(text)=>setAge(text)}
                            onSubmitEditing={()=>schoolInputRef.current.focus()}
                        />

                        {/* Validate age input */}
                        {
                            ( (isNumber(parseInt(age)) && age[0] !== '0') && (age.length > 0 && age.length <= 2) && ((age.length === 1 && parseInt(age) > 4) || (age.length === 2 && parseInt(age) < 19)))?
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* School */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={schoolInputRef}
                            placeholder='School'
                            style={styles.textInput}
                            onChangeText={(text)=>setSchool(text)}
                            onSubmitEditing={()=>gradeInputRef.current.focus()}
                        />

                        {/* Validate school name input */}
                        {
                            (isNaN(school) && (school.length > 0))?
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* Grade */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={gradeInputRef}
                            placeholder='Grade'
                            style={styles.textInput}
                            onChangeText={(text)=>setGrade(text)}
                            onSubmitEditing={()=>pickupAddressInputRef.current.focus()}
                        />

                        {/* Validate grade input */}
                        {
                            ( (grade.length !== 0) && ((isNumber(parseInt(grade)) && parseInt(grade) <= 13) || (isNaN(parseInt(grade)))))?
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* pickup address */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={pickupAddressInputRef}
                            placeholder='Pickup Address'
                            style={styles.textInput}
                            onChangeText={(text)=>setPickupAddress(text)}
                            onSubmitEditing={()=>agencyInputRef.current.focus()}
                        />

                        {/* Validate pickup address input */}
                        {
                            (pickupAddress.length > 0)?
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (<Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* Agency */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={agencyInputRef}
                            placeholder='Agency'
                            style={styles.textInput}
                        />
                        <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>
                    </View>

                    {/* Add Button */}
                    <View style={{alignItems: 'center', marginBottom: 250,}}>
                        <TouchableOpacity 
                        style={styles.addChildButton}
                        >
                        <Text style={{ fontSize: 30, color: colors.black, fontFamily: 'NotoSansMono-Bold' }}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: colors.white,
    },

    container: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 50,
    },

    childProfileAvatar: {
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.lightOrangeMui,
    },  

    scrollview: {
        flexGrow: 1,
    },

    inputContainer: {
        marginBottom: 20,
    },

    label:{
        marginLeft: 2,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.black,
    },

    inputBox: {
        height: 40,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 80,
        borderColor: colors.gray,
    },

    textInput: {
        marginLeft: 20,
        color: colors.black
    },

    required:{
        position: 'absolute',
        right: 10,
        color: colors.red,
    },

    addChildButton:{
        alignItems:'center',
        justifyContent: 'center',
        height: 60,
        width: 150,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: colors.orange,
        marginTop: 20,
        backgroundColor: colors.orange,
    },


});

export default AddChild