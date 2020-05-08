import React from 'react'
import {View,Text,ImageBackground, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {store} from '../../../redux/store'
import {signout} from '../../../redux/actions/auth_actions'
import {fetchOrganizerProfile} from "../../../redux/actions/app_actions";
import auth from '@react-native-firebase/auth'
import {resetPassword} from '../../../redux/actions/auth_actions'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Toast} from '../../../components/styled_components'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default class Profile extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        profile:{},
        isProfileLoading:false,
        msg:"",
        toggleToast:false,
        isEditOpen:false,
      }
    }

    _unsubscribe = null

    async componentDidMount(){
        
        this._unsubscribe = this.props.navigation.addListener('focus', async() => {
          this.setState({isProfileLoading:true})
          this.fetchProfile()
        });
        
        this.setState({isProfileLoading:true})
      this.fetchProfile()
    }

    componentWillUnmount() {
        this._unsubscribe();
      }

    resetPassword =  ()=>{
      const unsubscribe = auth().onAuthStateChanged(async(user)=>{
        if(user){
          try {
            await resetPassword(user.email)
            this.setState({msg:"Password reset email sent successfully. Check your email inbox"})
            this.setState({toggleToast:true},()=>{
              this.setState({toggleToast:false})
            })
            unsubscribe()
          } catch (error) {
            unsubscribe()
            this.setState({msg:error.message})
            this.setState({toggleToast:true},()=>{
              this.setState({toggleToast:false})
            })
          }
        }
        else{
          unsubscribe()
          this.setState({msg:"You are not authorized here"})
            this.setState({toggleToast:true},()=>{
              this.setState({toggleToast:false})
          })
        }
      })
    }

    

    logout = async()=>{
      try {
        await store.dispatch(signout())
        this.setState({msg:"Successfully logged out"})
        this.setState({toggleToast:true},()=>{
          this.setState({toggleToast:false})
        })
      } catch (error) {
        this.setState({msg:error})
        this.setState({toggleToast:true},()=>{
          this.setState({toggleToast:false})
        })
      }
    }

    fetchProfile = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            if(user){
              try {
                //console.log("fetching")
                unsubscribe()
                const profile = await fetchOrganizerProfile(user.uid)
                this.setState({profile:{...profile}})
                this.setState({isProfileLoading:false})
              } 
              catch (error) {
                this.setState({msg:error})
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
              }
            }   
        })
      
    }

    render(){
        if(this.state.isProfileLoading){
          return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                <ProgressBarAndroid color="#2F9AE3"/>
            </View>
          )
        }
        else
        return(
               <View style={{flex:1, backgroundColor:'white'}}>              
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              <View>
               <View style={{padding:15}}>
                <View style={{flexDirection:"row",alignItems:"center", paddingBottom:20}} >
                  <Text style = {{fontSize : 24, fontWeight : 'bold'}}>General</Text>
                  <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                        <MaterialIcon onPress={()=>this.props.navigation.navigate("Edit Profile",{profile:this.state.profile})}  name="circle-edit-outline" size={25} />
                    </View>
                </View>
                <View style = {{flexDirection : 'row', paddingLeft:10,paddingVertical:10,alignItems:"center"}}>
                  <Icon name="md-person" size={25} />
                  <Text style = {{fontSize:16, paddingLeft:20}}>{this.state.profile.name}</Text>
                  {/* <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                      <MaterialIcon onPress={this.editName}  name="circle-edit-outline" size={25} />
                  </View> */}
                </View>
                <View style = {{flexDirection : 'row', paddingLeft:8,paddingVertical:10,alignItems:"center"}}>
                  <MaterialIcon  name="email" size={25} />
                  <Text style = {{fontSize:16,paddingLeft:20}}>{this.state.profile.email}</Text>
                  
                </View>
                <View style = {{flexDirection : 'row', paddingLeft:4,paddingVertical:10,alignItems:"center"}}>
                  <MaterialIcon  name="gender-male-female" size={30} />
                  <Text style = {{fontSize:16, paddingLeft:20}}>{this.state.profile.gender}</Text>
                  {/* <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                      <MaterialIcon name="circle-edit-outline" size={25} />
                  </View> */}
                </View>
                <View style = {{flexDirection : 'row', paddingLeft:5,paddingVertical:10,alignItems:"center"}}>
                  <MaterialIcon  name="phone" size={25} />
                  <Text style = {{fontSize:16, paddingLeft:20}}>{this.state.profile.phone}</Text>
                  {/* <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                      <MaterialIcon name="circle-edit-outline" size={25} />
                  </View> */}
                </View>
                <View style = {{flexDirection : 'row', paddingLeft:5,paddingVertical:10,alignItems:"center"}}>
                  <EntypoIcon  name="location-pin" size={25} />
                  <Text style = {{fontSize:16, paddingLeft:20}}>{this.state.profile.city}</Text>
                  {/* <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                      <MaterialIcon name="circle-edit-outline" size={25} />
                  </View> */}
                </View>
              </View>

              <View style={{padding:15}}>
              <View style={{flexDirection:"row",alignItems:"center", paddingBottom:20}} >
                  <Text style = {{fontSize : 24, fontWeight : 'bold'}}>Company Info</Text>
                  <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                        <MaterialIcon onPress={()=>this.props.navigation.navigate("Edit Company Info",{profile:this.state.profile})}  name="circle-edit-outline" size={25} />
                    </View>
                </View>
                <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}} >
                
                    </View>
                    <TouchableOpacity >
                      <View style = {{flexDirection : 'row', paddingLeft:10,paddingVertical:10,alignItems:"center"}}>
                      <MaterialIcon name="office-building" size={25} />
                      <Text style = {{fontSize:16, paddingLeft:20}}>{this.state.profile.companyName}</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                      <View style = {{flexDirection : 'row', paddingLeft:10,paddingVertical:10,alignItems:"flex-start"}}>
                      <MaterialIcon name="information" size={25} />
                      <Text style = {{fontSize:16, paddingLeft:20,paddingRight:35}}>{this.state.profile.about}</Text>
                    </View>
                    </TouchableOpacity>
                
              </View>

              <View style={{padding:15}}>
                <Text style = {{fontSize : 24, fontWeight : 'bold', paddingBottom:20}}>Privacy & Security</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Edit Phone")} >
                      <View style = {{flexDirection : 'row',paddingVertical:10,alignItems:"center"}}>
                      <Icon name="ios-phone-portrait" size={25} style={{marginLeft:15}} />
                      <Text style = {{fontSize:16, paddingLeft:30}}>Change Phone Number</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetPassword} >
                      <View style = {{flexDirection : 'row', paddingLeft:10,paddingVertical:10,alignItems:"center"}}>
                      <MaterialIcon name="lock-reset" size={25} />
                      <Text style = {{fontSize:16, paddingLeft:20}}>Reset Password</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logout} >
                      <View style = {{flexDirection : 'row', paddingLeft:10,paddingVertical:10,alignItems:"center"}}>
                      <MaterialIcon name="logout" size={25} />
                      <Text style = {{fontSize:16, paddingLeft:20}}>Logout</Text>
                    </View>
                    </TouchableOpacity>
                
              </View>


                    
                </View>
                </ScrollView>
                <Toast visible={this.state.toggleToast} message={this.state.msg} />
               </View>
           
        )
    }
}

