import React,{useCallback,useState,useEffect} from 'react';
import {StyleSheet,View,TextInput,Dimensions, Alert,Text, TouchableOpacity,BackHandler} from 'react-native';
import { sendPhoneVerificationCode, navigateToMainApp } from '../../redux/actions/auth_actions';
import Loading from '../common/loading'
import { store } from '../../redux/store';
import {StyledButton,Toast} from '../../components/styled_components'
import {validatePhoneNumber} from '../../components/validations'
import { useFocusEffect } from '@react-navigation/native';
const {width} = Dimensions.get('window')

const Phone = (props) => {
  
  const [phone,setPhone] = useState("")
  const [msg,setMsg] = useState("")
  const [toggleToast,setToggleToast] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
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
    if(toggleToast === true){
      setToggleToast(false)
    }
  },[toggleToast])   

  const sendVerificationCode = async ()=>{
    try {
      const phone_number = '+92'+phone
      validatePhoneNumber(phone_number)
      setIsLoading(true)
      const verificationId = await sendPhoneVerificationCode(phone_number)
      setIsLoading(false)
      props.navigation.navigate("Code",{verificationId,phone:phone_number})  
    } catch (error) {
      setIsLoading(false)
      setMsg(error)
      setToggleToast(true)
    } 
  }

  const skipPhoneVerification = ()=>{
    store.dispatch(navigateToMainApp())
  }

    return (
      <>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={styles.container} >
                 
                <Text style={{fontSize:22,fontWeight:"bold",paddingBottom:25}}>Verify Phone Number</Text>
                
                <View style={{
                              alignItems:"center",
                              justifyContent:"flex-start",
                              flexDirection:"row",
                              borderWidth:1,
                              borderRadius:10,
                              width:220,
                            }} >
                  <Text style={{fontSize:20,color:"grey",paddingHorizontal:10}} >+92</Text>
                
                <TextInput
                    style={{fontSize:20}}
                    keyboardType="numeric"
                    onChangeText={(phone)=>{
                      setPhone(phone)
                    }}
                    placeholder="* * * * * * *"
                    maxLength={10}    
                  />
                  </View>
             
                <View style={{paddingVertical:25}} >
                  <StyledButton
                    loading={isLoading}
                    roundEdged 
                    height={40} 
                    fontSize={20} 
                    width={135}
                    title="Send Code"
                    onPress={sendVerificationCode}
                  />
                </View>
                <TouchableOpacity
                  style={{alignItems:"center",justifyContent:"center"}} 
                  onPress={skipPhoneVerification}
                >
                  <Text>Skip</Text>
                </TouchableOpacity>       
            <Toast message={msg} visible={toggleToast} />  
            <Loading visible={isLoading} />      
        </View> 
      </>
    );
  }

export default Phone

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    
  },
  interactionContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
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
});

