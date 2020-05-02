import React,{useState,useCallback,useEffect} from 'react';
import {StyleSheet,View,Dimensions,TextInput,BackHandler,Text,Alert} from 'react-native';
import {Picker} from '@react-native-community/picker'
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import {createUser,navigateToMainApp} from '../../redux/actions/auth_actions'
import Loading from '../common/loading'
import Icon from 'react-native-vector-icons/Ionicons'
import {StyledButton,StyledPicker,StyledTextInput,Toast} from '../../components/styled_components'
import {validateCreateUserForm} from '../../components/validations'
import { useFocusEffect } from '@react-navigation/native';

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
    const [picUrl,setPicUrl] = useState(null)
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
        Alert.alert("Warning","Are you sure you want to exit?",[{
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
  const CreateUser = async()=>{
       try {
            validateCreateUserForm(email,name,gender,city)
            const userProfile = {
              name:name,
              email:email,
              gender:gender,
              city:city,
              profilePicture:picUrl,
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
    return (
      <>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={styles.container} >
          <View style={styles.iconLeft} >
          </View>
          <View style={styles.interactionContainer}>
            <View style={{justifyContent:"flex-start", width:width, paddingLeft:40}} >
              <Text style={{fontSize:22,fontWeight:"bold"}}>Create Account</Text>
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
    justifyContent:'center'
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


