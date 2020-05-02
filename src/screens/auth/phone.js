import React from 'react';
import {StyleSheet,View,TextInput,Dimensions, Alert,Text, TouchableOpacity} from 'react-native';
import { sendPhoneVerificationCode, navigateToMainApp } from '../../redux/actions/auth_actions';
import Loading from '../common/loading'
import { store } from '../../redux/store';
import {StyledButton,Toast} from '../../components/styled_components'
import {validatePhoneNumber} from '../../components/validations'
const {width} = Dimensions.get('window')

export default class Phone extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        phone:"",
        msg:"",
        toggleToast:false,
        isLoading:false
    }
  }
  
  sendVerificationCode = async ()=>{
    try {
      const phone_number = '+92'+this.state.phone
      validatePhoneNumber(phone_number)
      this.setState({isLoading:true})
      const verificationId = await sendPhoneVerificationCode(phone_number)
      this.setState({isLoading:false})
      this.props.navigation.navigate("Code",{verificationId,phone:phone_number})  
    } catch (error) {
      this.setState({isLoading:false})
      this.setState({msg:error},()=>{
        this.setState({toggleToast:true},()=>{
        this.setState({toggleToast:false})
      })
    })   
  
    }
    
  }
  skipPhoneVerification = ()=>{
    store.dispatch(navigateToMainApp())
  }

  render(){
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
                      this.setState({phone})
                    }}
                    placeholder="* * * * * * *"
                    maxLength={10}    
                  />
                  </View>
             
                <View style={{paddingVertical:25}} >
                  <StyledButton
                    loading={this.state.isLoading}
                    roundEdged 
                    height={40} 
                    fontSize={20} 
                    width={135}
                    title="Send Code"
                    onPress={this.sendVerificationCode}
                  />
                </View>
                <TouchableOpacity
                  style={{alignItems:"center",justifyContent:"center"}} 
                  onPress={this.skipPhoneVerification}
                >
                  <Text>Skip</Text>
                </TouchableOpacity>
            
            <Toast message={this.state.msg} visible={this.state.toggleToast} />  
            <Loading visible={this.state.isLoading} />      
        </View>
        
      </>
    );
  }
};

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

