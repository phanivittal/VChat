import React,{useLayoutEffect,useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import { Avatar } from 'react-native-elements'
import {auth,db} from "../firebase";
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { TouchableOpacity } from 'react-native';
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"
import { Button } from 'react-native-elements/dist/buttons/Button';
import AddChatScreen from './AddChatScreen';
const HomeScreen = ({navigation}) => {

    const [chats,setChats]=useState([]);

    useEffect(()=>{
       // console.log("charts",db.collection('chats'));
        const unsubscribe=db.collection('chats').onSnapshot(snapshot=>(
            setChats(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
        ))
        return unsubscribe;
    },[])
    
  



    const signOutUser=()=>{
            auth.signOut().then(()=>{
                navigation.replace('Login')
            })
        }


    useLayoutEffect(() => {
       // console.log(chats);
        
        navigation.setOptions ( {
            title:"VChat",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerLeft:()=>(<View style={{marginLeft:20}}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                
                <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
            </View>),
           headerRight:()=>(
               <View style={{
                   flexDirection:'row',
                   justifyContent:'space-between',
                   width:80,
                   marginRight:20,
               }}>
                <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name='camerao' size={24} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress ={()=>navigation.navigate("AddChat")}
                activeOpacity={0.5}>
                    <SimpleLineIcons name="pencil" size={24} color="black"/>
                </TouchableOpacity>
               </View>
           ),

        });
    }, [navigation]);

    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{
            id,
            chatName,
        })
    }
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}> 
           
            {chats.map(({id,data:{chatName}})=>(
                     <CustomListItem
                      key={id} 
                      id={id} 
                      chatName={chatName}
                      enterChat={enterChat}  
                      />
                     
            ))}
               
            </ScrollView>
            
        </SafeAreaView>
    )
    
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:'100%',
    }
})
