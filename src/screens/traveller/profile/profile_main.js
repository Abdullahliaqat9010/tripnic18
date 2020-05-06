import React from 'react'
import {View,Text, Button,ImageBackground, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {store} from '../../../redux/store'
import {signout} from '../../../redux/actions/auth_actions'

export default class Profile extends React.Component{
    render(){
        return(
               <View style={{flex:1, backgroundColor:'white'}}>

                <View></View>
                <ImageBackground source={require('../../../assets/BG.png')} contentContainerStyle= {{flexGrow: 1, justifyContent: 'center',alignItems: 'centre'}} 
                style = {{width:'100%', height:250}}
                >
                <View style = {{ alignItems:'flex-start', margin:20, marginTop:30}}>
                <Image source = {require('../../../assets/pic.png')} style = {{justifyContent:'center'}}>
                </Image>
                <Text style = {{fontSize:20, marginTop:20, color:'white', fontWeight:'bold'}}>Charlie Puth</Text>
                <Text style = {{fontSize:20, marginTop:10, color:'white', fontWeight:'bold'}}>abcd1234@gmail.com</Text>
                </View>
               </ImageBackground>
              
            <ScrollView>
           

              <View>
               <View style={{ margin:10, marginTop:20, marginBottom:20}}>
                <Text style = {{fontSize : 24, fontWeight : 'bold', marginBottom:10}}>General</Text>
                <View style = {{flexDirection : 'row', marginTop:10}}>
                <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/personIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Abdullah Liaqat</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>
              </View>
               <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
               <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/emailIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.8}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>21100270@gmail.com</Text>
                </View>
                </View>

                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/GenderIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Male</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>

                
                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/phoneIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>+92001234567</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>

                <View style={{ marginTop:20, margin:10,}}>
                <Text style = {{fontSize : 24, fontWeight : 'bold', marginBottom:10}}>Privacy & Security</Text>
                <View style = {{flexDirection : 'row', marginTop:10}}>
                <View style = {{flex :0.2,alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/LockIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <TouchableOpacity>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Reset Password</Text>
                </TouchableOpacity>
                </View>
                </View>
              </View>
                
                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2, alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/LogoutIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <TouchableOpacity onPress={()=>store.dispatch( signout())} >
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Logout</Text>
                </TouchableOpacity>
                </View>
                </View>

                </View>
                </ScrollView>
               </View>
           
        )
    }
}

