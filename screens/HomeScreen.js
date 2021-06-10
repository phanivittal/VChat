import React,{useLayoutEffect} from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import { Avatar } from 'react-native-elements'
import {auth,db} from "../firebase";
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"
const HomeScreen = ({navigation}) => {
    useLayoutEffect(() => {
        //console.log(auth);
        const signOutUser=()=>{
            auth.signOut().then(()=>{
                navigation.replace("Login")
            })
        }
        navigation.setOptions ( {
            title:"VChat",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerLeft:()=>(<View style={{marginLeft:20}}>
                <TouchableOpacity ohPress={signOutUser} activeOpacity={0.5}>
                <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
            </View>),
            headerRight:()=>{
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name='camero' size={24} color='black'/>
                    </TouchableOpacity>
                </View>
            }

        });
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
               <CustomListItem/> 
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
