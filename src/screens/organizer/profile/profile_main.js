import React from 'react'
import {View,Text, Button, Image} from 'react-native'
import { TouchableOpacity, ScrollView, TextInput, } from 'react-native-gesture-handler'



export default class Profile extends React.Component{
    render(){
        return(
           <ScrollView>
            <View style={{flex:1, backgroundColor : 'white'}}>
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
                <Text style = {{fontSize : 24, fontWeight : 'bold', marginBottom:10}}>Company</Text>
                <View style = {{flexDirection : 'row', marginTop:10}}>
                <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/CompanyIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>TripNic</Text>
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
                <Image source = {require('../../../assets/LocationIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Lahore</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>

                
                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2}}>
                <Image source = {require('../../../assets/AboutIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>About Company</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>
                <View style= {{alignSelf:'center', flex:1,alignItems:'flex-start',height:162, width:288, borderColor:'grey', borderWidth:1,textAlignVertical : "top", alignContent:'flex-start', borderRadius:10  }}>
                <Text
                style={{padding:10}}
                >
                Message about Company
                </Text>
                </View>


                <View style={{ marginTop:20, margin:10,}}>
                <Text style = {{fontSize : 24, fontWeight : 'bold', marginBottom:10}}>Social Links</Text>
                <View style = {{flexDirection : 'row', marginTop:10}}>
                <View style = {{flex :0.2,alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/fbIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Facebook</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>
              </View>
             

                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2,alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/instagramIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Instagram</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>

                
                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2, alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/youtubeIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Youtube</Text>
                </View>
                <View style = {{flex: 0.2, alignItems : 'flex-end'}}>
                <TouchableOpacity>
                <Text style = {{fontSize:15, paddingRight:10, color: 'blue'}}>Edit</Text>
                </TouchableOpacity>
                </View>
                </View>

                <View style = {{flexDirection : 'row', marginTop:10, margin:10}}>
                <View style = {{flex :0.2, alignItems: 'flex-start'}}>
                <Image source = {require('../../../assets/twitterIcon.png')} height = {24}/>
                </View>
                <View style = {{flex :0.6}}>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Twitter</Text>
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
                <TouchableOpacity>
                <Text style = {{fontSize:24, alignSelf : 'flex-start', paddingLeft:10}}>Logout</Text>
                </TouchableOpacity>
                </View>
                </View>

                

            </View>
            </ScrollView>
        )
    }
}

