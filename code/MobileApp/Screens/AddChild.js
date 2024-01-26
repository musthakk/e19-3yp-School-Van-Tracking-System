import { View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView, Alert, Keyboard, TouchableOpacity, ScrollView, Platform} from 'react-native'
import React, { useRef, useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

// import custom module .js files
import colors from '../constants/colors';

// Import Icons,
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import {isNumber } from 'lodash';


const AddChild = () => {

    // track state of the textInputs..
    const [childName, setChildName] = useState("");
    const [age, setAge] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [agency, setAgency] = useState(null);

    const [key, setKey] = useState(0);


    // fetch data of the agencies from the Database.
    const [agencyData, setAgencyData] = useState([]); // Store the agency data (name) 

    useEffect(() => {
        fetch('http://13.126.69.29:3000/getAgencyInfo')
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
    
    // define agency name array..
    const AvailableAgencies = agencyData.map(agency=>agency.name)

    
    /*child profile Avatar*/
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

    // definition of validation variables..
    let isNameValid = 0, isAgeValid = 0, isSchoolValid = 0, isGradeValid = 0, isPickupAddValid = 0, isAgencyValid = 0;

    // validation alert..
    function Validate()
    {
        const message = "Check the input fields"
        if (!isNameValid || !isAgeValid || !isSchoolValid || !isGradeValid || !isPickupAddValid || !isAgencyValid)
        {
        Alert.alert('Validation Error', message);
        return 0;
        }
    }


    // Handle child addition when the ADD Button is pressed..
    const handleChildAddition = async () => {
        const validationStatus = Validate();
        if(validationStatus === 0)
        return;

        try {
        
        const username =  await SecureStore.getItemAsync('username');
        
        const response = await fetch('http://13.126.69.29:3000/AddChild', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            childName,
            username,
            age,
            school,
            grade,
            pickupAddress,
            agency,
            selectedProfileImg,
            }),
        });

        const data = await response.json();

        if (data.success) {
            console.log('child has been added successfully');
            Alert.alert("Child has been added succesfully... Wait for the Admin acceptance.");
            setKey(prevKey => prevKey + 1);

        } else {
            console.error('Addition failed:', data.message);
        }
        } catch (error) {
        console.error('Error during Addition:', error.message);
        }
    };


    // define input reference variables..
    const ageInputRef = useRef(null);
    const schoolInputRef = useRef(null);
    const gradeInputRef = useRef(null);
    const pickupAddressInputRef = useRef(null);
    
  return (
    <SafeAreaView style={styles.safearea} key={key}>
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
                            (isNameValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (isNameValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
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
                            ( isAgeValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            ( isAgeValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
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
                            ( isSchoolValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            ( isSchoolValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
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
                            ( isGradeValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            ( isGradeValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* pickup address */}
                    <View style={styles.inputBox}>
                        <TextInput
                            ref={pickupAddressInputRef}
                            placeholder='Pickup Address'
                            style={styles.textInput}
                            onChangeText={(text)=>setPickupAddress(text)}
                        />

                        {/* Validate pickup address input */}
                        {
                            (pickupAddress.length > 0)?
                            ( isPickupAddValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            ( isPickupAddValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                        
                    </View>

                    {/* Agency */}
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <SelectDropdown
                            data={AvailableAgencies}
                            onSelect={(selectedItem, index) => {
                                setAgency(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text to be displayed on the dropdown button after selecting an item
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                // text to be displayed for each item in the dropdown row
                                return item;
                            }}

                            buttonStyle= {styles.dropdownButton}
                            rowTextStyle = {styles.dropdownItemText}
                            defaultButtonText={
                                <Text style={{ color: 'gray', fontSize: 15, fontFamily: 'Roboto-Regular', }}>
                                    Select an Agency
                                </Text>
                            }
                            buttonTextStyle = {styles.dropDownButtonText}
                            
                        />

                        {
                            (agency !== null)?
                            (isAgencyValid = 1,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.darkGreen}}/>):
                            (isAgencyValid = 0,
                                <Ionicons name='checkmark-circle-outline' size={20} style={{...styles.required, color: colors.red}}/>)
                        }
                    </View>

                    {/* Add Button */}
                    <View style={{alignItems: 'center', marginBottom: 150,}}>
                        <TouchableOpacity 
                            onPress={handleChildAddition}
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

    dropdownButton:{
        borderRadius: 80,
        borderWidth: 1,
        borderColor: colors.gray,
        height: 40,
        width: '90%',
        marginTop: 5,
        backgroundColor: colors.white,
    },

    dropdownItemText:{
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.black,
    },

    dropDownButtonText: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.black,
        position: 'absolute',
        right: 12,
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