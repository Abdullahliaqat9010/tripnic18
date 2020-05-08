import React,{useState,useCallback,useEffect} from 'react';
import {StyleSheet,View,Dimensions,TextInput,BackHandler,Text,Alert,StatusBar,TouchableOpacity,Image} from 'react-native';
import {Picker} from '@react-native-community/picker'
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import {createUser} from '../../redux/actions/auth_actions'
import Loading from '../common/loading'
import ImagePicker from 'react-native-image-picker'
import {StyledButton,Toast} from '../../components/styled_components'
import {validateCreateUserForm} from '../../components/validations'
import { useFocusEffect } from '@react-navigation/native';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'

const {width} = Dimensions.get('window')


const mapStateToProps = (state)=>{
  return{
    email:state.firebaseReducer.auth.email,
    isOrganizer:state.authReducer.isOrganizer,
  };
}

const CustomePicker = (props)=>{
  const [selectedValue,setSelectedValue] = React.useState("Not Specified")
  return(
    <Picker
        mode="modal"
        selectedValue={selectedValue}
        style={{ height: 50, width: 160 }}
        onValueChange={(itemValue, itemIndex) => {
          props.select(itemValue)
          setSelectedValue(itemValue)
        }}
        
      >
        {props.options.map((item,index)=>(
          <Picker.Item label={item} value={item} key={index} />
        ))}
        
      </Picker>
  )
}


const CreateAccount = (props) => {

    const [email,setEmail] = useState(props.route.params.email?props.route.params.email:props.email)
    const [src,setSrc] = useState(null)
    const [picUrl,setPicUrl] = useState(null)
    const [imageUploading,setImageUploading] = useState(false)
    const [name,setName] = useState("")
    const [city,setCity] = useState("Not Specified")
    const [gender,setGender] = useState("Not Specified")
    const [msg,setMsg] = useState("")
    const [toggleToast,setToggleToast] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [genderOptions] = useState([
                                        "Not Specified",
                                        "Male",
                                        "Female",
                                        "Other",
                                      ])
    const [cityOptions] = useState([
                                      "Not Specified",
                                      "Lahore",
                                      "Karachi",
                                      "Islamabad",
                                      ])
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Warning","Are you sure you want to exit application?",[{
          text:"Yes",
          onPress:()=>{BackHandler.exitApp()}
        },{
          text:"No",
        }])  
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  useEffect(()=>{
    if(toggleToast === true)
    {
      setToggleToast(false)
    } 
  },[toggleToast])

  const SelectGender = (gender)=>{
    setGender(gender)
  }  

  const SelectCity = (city)=>{
    setCity(city)
  }

  const selectImage = ()=>{        
        
    ImagePicker.launchImageLibrary({},async (response) => {
        // Same code as in above section!
        if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            try {
              setImageUploading(true)
              setIsLoading(true)
              const imageUrl = await uploadImage(response.path,response.fileName)
              setIsLoading(false)
              setImageUploading(false)
              setSrc(response.uri)
              setPicUrl(imageUrl)
            } 
            catch (error) {
              setIsLoading(false)
              setImageUploading(false)
              setMsg(error)
              setToggleToast(true)
            }
            //console.log(response)
          }
    });
}

  const CreateUser = async()=>{
       try {
            console.log(picUrl)
            validateCreateUserForm(email,name,gender,city)
            const userProfile = {
              name:name,
              email:email,
              gender:gender,
              city:city,
            }
            setIsLoading(true)
            await store.dispatch(createUser(userProfile,props.isOrganizer))
            setIsLoading(false)
            if(props.isOrganizer){
              props.navigation.navigate("AboutCompany")
            }
            else{
              props.navigation.navigate("Phone")
              //store.dispatch(navigateToMainApp())
            }
               
       } 
       catch (error) {
        setIsLoading(false)
        setMsg(error)
        setToggleToast(true)
       }
   }
   const uploadImage = (path,filename)=>{
    return new Promise((res,rej)=>{
      try {
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
          const reference = storage().ref('users/'+user.uid+'/'+filename);
          await reference.putFile(path)
          const downloadUrl = await reference.getDownloadURL()
          await user.updateProfile({photoURL:downloadUrl})
          unsubscribe()
          res(downloadUrl)
        })
      } catch (error) {
        unsubscribe()
        rej(error)
      }
    })
  }

    return (
      <>
        <StatusBar barStyle="dark-content" translucent={false} />
        <View style={styles.container} >
          <View style={styles.iconLeft} >
          </View>
          <View style={styles.interactionContainer}>
            <View style={{justifyContent:"flex-start", width:width, paddingLeft:40}} >
              <Text style={{fontSize:22,fontWeight:"bold"}}>Create Account</Text>
            </View>
            <View style={{width:width,alignItems:"flex-start",paddingLeft:40}} >
                <TouchableOpacity onPress={()=>selectImage()} >
                  {
                    imageUploading?
                    <View style={{alignItems:"center",justifyContent:"center",width:80,height:80,borderRadius:10,marginTop:10,borderWidth:1,backgroundColor:"#DFDBDB"}}>
                      <ProgressBarAndroid color="white" />
                    </View>
                    :
                    <Image style={{width:80,height:80,borderRadius:10,marginTop:10,borderWidth:1,borderColor:"grey"}} source={src?{uri:src}:require('../../assets/profile-placeholder.png')} />
                  }
                </TouchableOpacity>
            </View>
            <View style={styles.input} >
              <TextInput style={styles.inputText} 
              onChangeText={(email)=>{
                setEmail(email)
              }}
              defaultValue={email}
              placeholder="Enter your Email Address" />
            </View>
            <View style={styles.input} >
              <TextInput  style={styles.inputText} 
              onChangeText={(name)=>{
                setName(name)
              }}
              placeholder="Enter Your Full Name" />
            </View>
            <View style={styles.dropdownContainer} >
              <View style={{justifyContent:"center"}}>
                <Text style={styles.inputText} >City</Text>
              </View>
              <View style={{flex:1,alignItems:"flex-end"}} >
                <CustomePicker options={cityOptions} select={SelectCity} />
              </View>
            </View>
            
            <View style={styles.dropdownContainer} >
              <View style={{justifyContent:"center"}}>
                <Text style={styles.inputText} >Gender</Text>
              </View>
              <View style={{flex:1,alignItems:"flex-end"}} >
                <CustomePicker options={genderOptions} select={SelectGender} />
              </View>
            </View>
            <View style={styles.authButtonContainer}>
                <StyledButton
                  roundEdged
                  width={160}
                  height={40}
                  onPress={CreateUser}
                  title="Create Account"
                  fontSize={20}
                  loading={isLoading}
                />
              </View>
           
          </View>
          <Loading visible={isLoading} />
          <Toast message={msg} visible={toggleToast} />
        </View>      
      </>
    );
};


export default connect(mapStateToProps)(CreateAccount)
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"white"
  },
  interactionContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    //backgroundColor:"red",
  },
  termsContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:100
    
  },
  iconLeft:{
    height:50,
    paddingLeft:15,
    justifyContent:"center",
    width:width,
  },
  authButtonContainer:{
    flexDirection:"row",
    justifyContent:"center",
    paddingVertical:30
   
  },
  organizerCreateAccountButton:{
    backgroundColor:"#2F9AE3",
    width:200,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    marginLeft:5
  },
  travellerCreateAccountButton:{
    backgroundColor:"#2BB396",
    width:200,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    marginRight:5
  },
  ButtonText:{
    fontSize:20,
    color:"white"
  },
  termsText:{
    color:"#989595",
    textAlign:"center"
  },
  orConnectWithText:{
    color:"#989595",
    //paddingBottom:20
  },
  input:{
    width:width-(2*40),
    borderWidth:1,
    marginTop:20,
    borderRadius:10,
    borderColor:"#A7A5A5",
    paddingLeft:10,
    justifyContent:"flex-start"
  },
  dropdownContainer:{
    width:width-(2*40),
    flexDirection:"row",
    borderWidth:1,
    marginTop:20,
    borderRadius:10,
    borderColor:"#A7A5A5",
    paddingLeft:10,
    justifyContent:"flex-start"
  },
  inputText:{
    fontSize:16,
    color:"black"
  }

});


