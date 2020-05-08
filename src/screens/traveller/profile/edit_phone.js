import React,{useState,useEffect} from 'react';
import {StyleSheet,View,TextInput,Dimensions, Text} from 'react-native';
import { sendPhoneVerificationCode,verifyCode} from '../../../redux/actions/auth_actions';
import Loading from '../../common/loading'
import {StyledButton,Toast} from '../../../components/styled_components'
import {validatePhoneNumber,validatePhoneCode} from '../../../components/validations'
const {width} = Dimensions.get('window')

const Phone = (props) => {
  
  const [phone,setPhone] = useState("")
  const [msg,setMsg] = useState("")
  const [toggleToast,setToggleToast] = useState(false)
  const [isPhoneLoading,setIsPhoneLoading] = useState(false)
  const [isCodeLoading,setIsCodeLoading] = useState(false)
  const [code,setCode] = useState("")
  const [verificationId,setVerificationId] = useState("")

  useEffect(()=>{
    if(toggleToast === true){
      setToggleToast(false)
    }
  },[toggleToast])   

  const sendVerificationCode = async ()=>{
    try {
      const phone_number = '+92'+phone
      validatePhoneNumber(phone_number)
      setIsPhoneLoading(true)
      const verificationId = await sendPhoneVerificationCode(phone_number)
      setVerificationId(verificationId)
      setIsPhoneLoading(false)
      setMsg("Enter OTP code")
      setToggleToast(true)
      //props.navigation.navigate("Code",{verificationId,phone:phone_number})  
    } catch (error) {
        setIsPhoneLoading(false)
        setMsg(error)
        setToggleToast(true)
    } 
  }

  const verifyPhoneCode = async ()=>{
    if(verificationId==="") return
    try {
      validatePhoneCode(code)
      setIsCodeLoading(true)
      await verifyCode(code,verificationId)  
      setIsCodeLoading(false)
      setMsg("Updated Phone Number Successfully")
      setToggleToast(true)
      props.navigation.goBack()  
    } 
    catch (error) {
        setIsCodeLoading(false)
        setMsg(error)
        setToggleToast(true)
    } 
  }

    return (
      <>
        <View style={styles.container} >
                 
                <Text style={{fontSize:22,fontWeight:"bold",paddingBottom:40}}>Update Phone Number</Text>
                <View style={{flexDirection:"row",alignItems:"center"}} >
                    <View style={{
                                alignItems:"center",
                                justifyContent:"flex-start",
                                flexDirection:"row",
                                borderWidth:1,
                                borderRadius:10,
                                width:150,
                                height:45,
                                marginLeft:20
                                }} >
                    <Text style={{fontSize:15,color:"grey",paddingHorizontal:10}} >+92</Text>
                    
                    <TextInput
                        style={{fontSize:15,textAlignVertical:"bottom"}}
                        keyboardType="numeric"
                        onChangeText={(phone)=>{
                        setPhone(phone)
                        }}
                        placeholder="* * * * * * *"
                        maxLength={10}    
                    />
                    </View>
                    <View style={{flex:1,alignItems:"flex-end",paddingRight:20}} >
                        <StyledButton
                            loading={isPhoneLoading}
                            roundEdged 
                            height={45} 
                            fontSize={15} 
                            width={135}
                            title="Send Code"
                            onPress={sendVerificationCode}
                        />
                    </View> 
                </View>

                <View style={{flexDirection:"row",alignItems:"center",marginTop:20}} >
                    <View style={{
                                alignItems:"center",
                                justifyContent:"center",
                                flexDirection:"row",
                                borderWidth:1,
                                borderRadius:10,
                                width:150,
                                height:45,
                                marginLeft:20
                                }} >
                    
                    <TextInput
                        style={{fontSize:15,textAlignVertical:"bottom"}}
                        keyboardType="numeric"
                        onChangeText={(code)=>{
                        setCode(code)
                        }}
                        placeholder="* * * * * *"
                        maxLength={6}    
                    />
                    </View>
                    <View style={{flex:1,alignItems:"flex-end",paddingRight:20}} >
                        <StyledButton
                            loading={isCodeLoading}
                            roundEdged 
                            height={45} 
                            fontSize={15} 
                            width={135}
                            title="Verify Code"
                            onPress={verifyPhoneCode}
                        />
                    </View> 
                </View>
             
                     
            <Toast message={msg} visible={toggleToast} />  
            <Loading visible={isCodeLoading || isPhoneLoading} />      
        </View> 
      </>
    );
  }

export default Phone

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:"white",
    paddingTop:50
    
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

