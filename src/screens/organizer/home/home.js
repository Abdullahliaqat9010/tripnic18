import React from 'react'
import {View,Text,ImageBackground, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {fetchOrganizerProfile} from "../../../redux/actions/app_actions";
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import {Toast} from '../../../components/styled_components'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default class Home extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        profile:{},
        isProfileLoading:false,
        isImageUploading:false,
        msg:"",
        toggleToast:false,
        numTrips:0
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
                await this.uploadImage(response.path,response.fileName)
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
            await firestore().collection('organizers').doc(user.uid).update({
              photoUrl:downloadUrl
            })
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

    countTrip = () => {
      return new Promise((res,rej)=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
          if(user){
            try {
              unsubscribe()
              const tripRef = firestore().collection('trips').where('host','==',user.uid)
              const trips = await tripRef.get()
              this.setState({numTrips:trips.docs.length})
              res()
            } catch (error) {
              rej(error.message)
            }
          }
          else{
            rej("You are not authorized here")
          }
        })
      })
    }

    fetchProfile = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            if(user){
              try {
                //console.log("fetching")
                unsubscribe()
                const profile = await fetchOrganizerProfile(user.uid)
                await this.countTrip()
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
                <ProgressBarAndroid color="#2F9AE3" />
            </View>
          )
        }
        else
        return(
               <View style={{flex:1, backgroundColor:'white'}}>
                  <ImageBackground  source={require('../../../assets/BG2.png')} contentContainerStyle= {{justifyContent: 'center'}} 
                    style = {{width:'100%', height:300}}
                  >
                    <View style={{padding:20}} >
                        <Text style={{fontSize:40,color:"white"}} >{this.state.profile.companyName}</Text>
                    </View>
                    <View style = {{ alignItems:'flex-start', marginLeft:20,marginBottom:20}}>
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
                <View style={{flexDirection:"row",alignItems:"center", paddingBottom:5}} >
                  <Text style = {{fontSize : 28, fontWeight : 'bold'}}>My Trips</Text>
                </View>
                

                <View style = {{flexDirection : 'row', paddingLeft:5,paddingVertical:10,alignItems:"center"}}>
                  <Text style={{fontSize:20,paddingLeft:10}} >Posted Trips:</Text>
                  <Text style = {{fontSize:20, paddingLeft:20}}>{this.state.numTrips}</Text>
                  
                </View>
              </View>

              

                    
                
            
                    
                </View>
                </ScrollView>
                <Toast visible={this.state.toggleToast} message={this.state.msg} />
               </View>
           
        )
    }
}

