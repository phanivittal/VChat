import { StatusBar } from 'expo-status-bar';
import {Button,Input,Text} from 'react-native-elements';
import React,{useState,useLayoutEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, ViewBase } from 'react-native'
import {auth} from "../firebase";
const RegisterScreen = ({navigation}) => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back to login",
        });
    },[navigation]);
   
    const register =() =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=> {
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        })
        .catch((error)=>alert(error.message));
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>

            <Text h3 style={{marginBottom:50}}>Create a VChat account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type='text' value={name} onChangeText={(text)=>setName(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Email"  type='email' value={email} onChangeText={(text)=>setEmail(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="password" secureTextEntry type='password' value={password} onChangeText={(text)=>setPassword(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder=" Profile picture (optional)"  type='' value={imageUrl} onChangeText={(text)=>setImageUrl(text)} />
            </View>
            <Button
                containerStyle={styles.button}
                raised
                onPress={register} 
                title="Register"
         />
         <View style={{height:20}}/>
        </KeyboardAvoidingView>
    ) 
}

export default RegisterScreen

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',

    },
    inputContainer:{ 
        width:300,
    },
    button:{
        width:200,
        marginTop:20,
    },
})
