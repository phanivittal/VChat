import React,{ useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import {StatusBar} from "expo-status-bar";
import { Button,Input,Image} from "react-native-elements"
import {auth} from "../firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
     const unsubscribe=   auth.onAuthStateChanged((authUser)=>{
         console.log(authUser);
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    },[])
    const signIn =()=>{
        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));
    }
    return (
        <KeyboardAvoidingView  style={styles.container}>
        <StatusBar style="light"/>
            <Image source={{
                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"

                }}
                 style={{width:200,height:200}}   
                />
               <View style={styles.inputContainer}>
                    <Input 
                    placeholder="Email" 
                    autoFocus type="Email" 
                    value={email} 
                    onChangeText={(text)=>setEmail(text)}
                    />
                    <Input 
                    placeholder="Password"
                     secureTextEntry 
                     type="password"
                     value={password} 
                    onChangeText={(text)=>setPassword(text)}
                     onSubmitEditing={signIn}
                     />
               </View>
               <Button onPress={signIn} containerStyle={styles.button} onPress={signIn} title="Login"/>
               <Button onPress={()=>navigation.navigate("SignUp")} containerStyle={styles.button} type="outline" title="Register"/>
                <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
          flex:1,
        alignItems: 'center',
        padding:10,
    justifyContent: 'center',
    backgroundColor:"white",
    },
   
    inputContainer:{ 
        width:300,
    },
    button: {
      width:200,
      marginTop:10,
  },
});
