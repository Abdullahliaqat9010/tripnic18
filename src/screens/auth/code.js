import React,{useCallback,useState,useEffect} from 'react';
import {StyleSheet,View,Text, Alert,TouchableOpacity,BackHandler} from 'react-native';
import { store } from '../../redux/store';
import {verifyCode,sendPhoneVerificationCode,navigateToMainApp} from '../../redux/actions/auth_actions'
import Loading from '../common/loading'
import {StyledButton,OTPInput,Toast} from '../../components/styled_components'
import {validatePhoneCode} from '../../components/validations'
import { useFocusEffect } from '@react-navigation/native';

const Code = (props) => {

  const [code,setCode] = useState("")
  const [isVerifyCodeLoading,setIsVerifyCodeLoading] = useState(false)
  const [msg,setMsg] = useState("")
  const [toggleToast,setToggleToast] = useState(false)
  const [isResendLoading,setIsResendLoading] = useState(false)
  const [timer,setTimer] = useState(59)
  const [verificationId,setVerificationId] = useState(props.route.params?.verificationId)   

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

  useEffect(()=>{
    const t = setTimeout(()=>{
      if(timer > 0){
        setTimer(timer-1)
      }
      else{
        clearInterval(t)
      }
    },1000)
    return ()=>{
      clearTimeout(t)
    }
  },[timer])
    
  const VerifyCode = async ()=>{
      try {
        validatePhoneCode(code)
        setIsVerifyCodeLoading(true)
        await verifyCode(code,verificationId)
        setIsVerifyCodeLoading(false)
        store.dispatch(navigateToMainApp())
      } 
      catch (error) {
        setIsVerifyCodeLoading(false)
        setMsg(error)
        setToggleToast(true)
      }
  }
  
  const resendCode = async ()=>{
    try {
      const phone_number = props.route.params?.phone
      setIsResendLoading(true)
      const verificationId = await sendPhoneVerificationCode(phone_number)
      setIsResendLoading(false)
      setVerificationId(verificationId)
      setTimer(59)  
    } catch (error) {
        setIsResendLoading(false)
        setMsg(error)
        setToggleToast(true)
    }
  }

  const skipPhoneVerification = ()=>{
    store.dispatch(navigateToMainApp())
  }

  const changeMobileNumber = ()=>{
    props.navigation.goBack()
  }

    return (
      <>
        <View style={styles.container} >     
          <Text style={{fontSize:22,fontWeight:"bold",paddingBottom:25}}>Enter OTP</Text>
          <OTPInput
            onChangeText={(code)=>{
              setCode(code)
            }}
          />
          <View style={{paddingVertical:25}} >
            <StyledButton
              loading={isVerifyCodeLoading}
              roundEdged 
              height={40} 
              fontSize={20} 
              width={135}
              title="Verify Code"
              onPress={VerifyCode}
            />
          </View>
          <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
            <View style={{marginRight:3}} >
              <StyledButton
                title="Skip" 
                width={40}
                height={30}
                roundEdged
                backgroundColor="grey"
                textColor="white"
                onPress={skipPhoneVerification}
                />
            </View>
            <View  style={{marginLeft:3}} >
              <StyledButton 
                title="Change Number" 
                width={120}
                height={30}
                roundEdged
                backgroundColor="grey"
                textColor="white"
                onPress={changeMobileNumber}
                />
            </View>
          </View>
          <View style={{paddingVertical:10}} >
          { 
            timer <= 0?
            <StyledButton 
              loading={isResendLoading}
              title="Resend" 
              width={80}
              height={30}
              roundEdged
              backgroundColor="grey"
              textColor="white"
              onPress={resendCode}
              />:
              <Text style={styles.text} >{(timer > 9?'00:':'00:0')+timer}</Text>
          }
          </View>
      
      <Toast message={msg} visible={toggleToast} />  
      <Loading visible={isResendLoading || isVerifyCodeLoading} />      
  </View>
  
      </>
    );
  }

export default Code

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:18,
    paddingHorizontal:10
  }

});

