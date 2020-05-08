import React from 'react'
import {View,Text,ImageBackground, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {store} from '../../../redux/store'
import {signout} from '../../../redux/actions/auth_actions'
import {fetchTravellerProfile} from "../../../redux/actions/app_actions";
import auth from '@react-native-firebase/auth'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Toast} from '../../../components/styled_components'
import {resetPassword} from '../../../redux/actions/auth_actions'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default class Profile extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        profile:{},
        isProfileLoading:false,
        isImageUploading:false,
        msg:"",
        toggleToast:false,
        isEditOpen:false,
      }
    }

    selectImage = ()=>{           
      ImagePicker.launchImageLibrary({},async (response) => {
          // Same code as in above section!
          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              try {
                this.setState({isImageUploading:true})
                console.log("1")
                await this.uploadImage(response.path,response.fileName)
                console.log("2")
                this.setState({isImageUploading:false})
                this.setState({isProfileLoading:true})
                this.fetchProfile()
              } 
              catch (error) { 
                this.setState({isProfileLoading:true})
                this.setState({msg:error.message})
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
              }
              //console.log(response)
            }
      });
  }
  uploadImage = (path,filename)=>{
      return new Promise((res,rej)=>{
        try {
          console.log(path)
          const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            const reference = storage().ref('users/'+user.uid+'/'+filename);
            await reference.putFile(path)
            const downloadUrl = await reference.getDownloadURL()
            console.log(downloadUrl)
            await user.updateProfile({photoURL:downloadUrl})
            await firestore().collection('travellers').doc(user.uid).update({
              photoUrl:downloadUrl
            })
            console.log("updated")
            unsubscribe()
            res()
          })
        } 
        catch (error) {
          unsubscribe()
          console.log(error)
          rej(error)
        }
      })
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
                const profile = await fetchTravellerProfile(user.uid)
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
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}} >
                <ProgressBarAndroid color="#2BB396" />
            </View>
          )
        }
        else
        return(
               <View style={{flex:1, backgroundColor:'white'}}>
                  <ImageBackground  source={require('../../../assets/BG.png')} contentContainerStyle= {{justifyContent: 'center'}} 
                    style = {{width:'100%', height:230}}
                  >
                    <View style = {{ alignItems:'flex-start', margin:20, marginTop:30,elevation:5}}>
                      <TouchableOpacity activeOpacity={0.8} onPress={this.selectImage} >
                        {
                          this.state.isImageUploading?
                          <View style={{width:100,height:100,borderRadius:15,borderWidth:1,borderColor:"white",backgroundColor:"#DCDADA",justifyContent:"center",alignItems:"center"}} >
                            <ProgressBarAndroid color="white" />
                          </View>
                          :
                          <View style={{width:100,height:100,borderRadius:15,borderColor:"white",backgroundColor:"#DCDADA"}}>
                            <Image 
                          source = {this.state.profile.photoUrl?{uri:this.state.profile.photoUrl}:require('../../../assets/profile-placeholder.png')} 
                          style = {{width:100,height:100,borderRadius:15}}/>
                          </View>
                        }
                      </TouchableOpacity>
                    
                      <Text style = {{fontSize:20, marginTop:20, color:'white', fontWeight:'bold'}}>{this.state.profile.name}</Text>
                      <Text style = {{fontSize:15, marginTop:10, color:'white'}}>{this.state.profile.email}</Text>
                    </View>
               </ImageBackground>
              
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
                <Text style = {{fontSize : 24, fontWeight : 'bold', paddingBottom:20}}>Privacy & Security</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Edit Phone")} >
                      <View style = {{flexDirection : 'row', paddingHorizontal:18,paddingVertical:10,alignItems:"center"}}>
                      <Icon name="ios-phone-portrait" size={25} />
                      <Text style = {{fontSize:16, paddingLeft:26}}>Change Mobile Number</Text>
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

