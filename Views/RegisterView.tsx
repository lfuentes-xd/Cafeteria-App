import { FormControl, Text, Image, FormControlLabel, Button, ButtonText, FormControlLabelText, Input, InputField } from '@gluestack-ui/themed';
import { Box, VStack } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { ApiUrl } from './API/Config';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';


const RegisterView = () => {
    const navigation = useNavigation();
    let regex_email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const digit = /[0-9]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const nonAlphanumeric = /[^0-9A-Za-z]/;
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});



    const isStrongPassword = Password =>
        [digit, upperCase, lowerCase, nonAlphanumeric]
            .every(re => re.test(Password))
        && Password.length >= 8
        && Password.length <= 32;
    const validate = () => {
        setErrors({});
        console.log('email', formData.Email);
        console.log('password', formData.Password);
        if (regex_email.test(formData.Email) === undefined) {
            console.log('regex_email', formData.Email);
            setErrors({
                ...errors,
                Email: 'email is not valid'
            });
            return false
        }
        if (formData.Email === undefined) {
            console.log('undefined', formData.Email);
            setErrors({
                ...errors,
                Email: 'email is required'
            });
            return false;
        } else if (formData.Email.length < 3) {
            console.log('length', formData.Email);
            setErrors({
                ...errors,
                Email: 'email is too short'
            });
            return false;
        }
        if (!isStrongPassword(formData.Password)) {
            setErrors({
                ...errors,
                Password: 'password is not validate'
            });
            return false;
        }
        return true;
    }
    const onSubmit = async () => {
        if (validate()) {
            try {
                formData.Rol = 0;
                console.log("datos", formData)
                const response = await axios.post(`${ApiUrl}StoreRegister`, formData); //carlos
                //const response = await axios.post('http://192.168.100.4/Mobiles/backend/public/api/StoreRegister', formData); //lemuel
                console.log("Successful registration", response.data);
                Alert.alert('success', 'login succesfully');
                navigation.navigate('Principal');
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.log('Validation failed', errors);
        }
    }


    return <Box maxWidth="100%" width={"$full"} height="$1/3" borderRadius="$sm">
        <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("../../Cafeteria-App/assets/pantalla_inicio2.png")} resizeMode="cover" style={{
            alignSelf: "center"
        }} />
        <Text ml={"$5"} fontWeight='$bold' fontSize={"$2xl"} borderBottomColor='black'>Register</Text>
        <VStack padding={"$5"}>
            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>Name</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField placeholder='Name' defaultValue='' type='text' onChangeText={value => setData({
                        ...formData,
                        Name: value
                    })} />
                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>FirstSurname</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField type='text' placeholder='FirstSurname' defaultValue='' onChangeText={value => setData({
                        ...formData,
                        FirstSurname: value
                    })} />

                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>SecondSurname</FormControlLabelText>
                </FormControlLabel>
                <Input>
                    <InputField type='text' placeholder='SecondSurname' defaultValue='' onChangeText={value => setData({
                        ...formData,
                        SecondSurname: value
                    })} />

                </Input>

            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>number control</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$full"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">
                    <InputField type='text' defaultValue='' placeholder='Control number'
                        onChangeText={value => setData({
                            ...formData,
                            ControlNumber: value
                        })} />

                </Input>

            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>Phone number</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$full"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="text" defaultValue="" placeholder="Phone number"
                        onChangeText={value => setData({
                            ...formData,
                            PhoneNumber: value
                        })} />

                </Input>

            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>Email</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$full"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="text" defaultValue="" placeholder="email"
                        onChangeText={value => setData({
                            ...formData,
                            Email: value
                        })} />

                </Input>
            </FormControl>
            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" fontSize={"$sm"} fontWeight='$bold'>Password</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$full"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">

                    <InputField type="password" defaultValue="" placeholder="password"
                        onChangeText={value => setData({
                            ...formData,
                            Password: value
                        })} />

                </Input>
            </FormControl>


            <Button onPress={onSubmit} action={"primary"} backgroundColor={"#FFA600"} mt={"$2"} size={"lg"} mx={"$auto"} width={"$full"} borderRadius={"$lg"} mt={"$2"} isDisabled={false} sx={{}}>
                <ButtonText>
                    Register
                </ButtonText>
            </Button>
        </VStack>
    </Box>;
};
export default RegisterView;