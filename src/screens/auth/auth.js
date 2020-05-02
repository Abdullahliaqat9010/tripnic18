import React from 'react';
import {StyleSheet,View,TouchableOpacity,Text,TextInput,StatusBar, Alert,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import Icon from 'react-native-vector-icons/Ionicons'
import { facebookLogin, googleLogin, validateUser, navigateToMainApp} from '../../redux/actions/auth_actions'
import {StyledButton,Toast,StyledTextInput} from '../../components/styled_components'
import {validateEmail} from '../../components/validations'

const {width} = Dimensions.get('window')

const mapStateToProps = (state)=>{
  return{
    isOrganizer:state.authReducer.isOrganizer,
  };
}

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email:"",
        isFbLoading:false,
        isGoogleLoading:false,
        msg:""
    }
}
  
facebookLogin = async ()=>{
    try {
        this.setState({isFbLoading:true})
        await facebookLogin()
        var profileExists = await store.dispatch(validateUser(this.props.isOrganizer))
        if(profileExists){
            //go to main app
            this.setState({isFbLoading:false})
            store.dispatch(navigateToMainApp())
        }
        else{
            //go to create account
            this.setState({isFbLoading:false})
            this.props.navigation.navigate("CreateAccount",{isSocialAccount:true})
        }    
    } catch (error) {
        this.setState({isFbLoading:false})
        this.setState({msg:error},()=>{
          this.setState({toggleToast:true},()=>{
            this.setState({toggleToast:false})
          })
        })
    }
    
}

googleLogin = async()=>{
    try {
        this.setState({isGoogleLoading:true})
        await googleLogin()
        var profileExists = await store.dispatch(validateUser(this.props.isOrganizer))
        if(profileExists){
            //go to main app
            this.setState({isGoogleLoading:false})
            store.dispatch(navigateToMainApp())
        }
        else{
            //go to create account
            this.setState({isGoogleLoading:false})
            this.props.navigation.navigate("CreateAccount",{isSocialAccount:true})
        }    
    } catch (error) {
        this.setState({isGoogleLoading:false})
        this.setState({msg:error},()=>{
          this.setState({toggleToast:true},()=>{
            this.setState({toggleToast:false})
          })
        })
    }  
  }

  render(){
    return (
      <>
        
        <View style={styles.container} >
        <StatusBar barStyle="dark-content" translucent={false} />
          <View style={styles.iconLeft} >
            <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back" size={40} />
          </View>
          <View style={styles.interactionContainer}>
            <View style={{justifyContent:"flex-start", width:width, paddingLeft:35,paddingBottom:25}} >
              <Text style={{fontSize:22,fontWeight:"bold"}}>Login/Signup</Text>
            </View>
              
              <StyledTextInput
                
                width={width-70}
                onChangeText={(email)=>{
                  this.setState({email})
                }}
                placeholder={this.props.isOrganizer?"Enter Your Business Email":"Enter Your Email"}
              />
              <View style={styles.authButtonContainer}>
                <View style={{paddingHorizontal:10}} >
                  <StyledButton 
                    title="Login" 
                    roundEdged 
                    height={40} 
                    fontSize={20} 
                    width={135} 
                    onPress={()=>{
                      if(validateEmail(this.state.email)){
                        this.props.navigation.navigate("Login",{email:this.state.email})
                      }
                      else{
                        this.setState({msg:"Invalid or Empty email address"},()=>{
                          this.setState({toggleToast:true},()=>{
                            this.setState({toggleToast:false})
                          })
                        })
                      }
                    }}
                    />
                </View>
                <View style={{paddingHorizontal:10}} >
                  <StyledButton 
                    title="Signup" 
                    roundEdged 
                    height={40} 
                    fontSize={20} 
                    width={135}   
                    onPress={()=>{
                      if(validateEmail(this.state.email)){
                        this.props.navigation.navigate("Signup",{email:this.state.email})
                      }
                      else{
                        this.setState({msg:"Invalid or Empty email address"},()=>{
                          this.setState({toggleToast:true},()=>{
                            this.setState({toggleToast:false})
                          })
                        })
                      }
                    }}
                    />
                </View>
                
              </View>
            <Text style={styles.orConnectWithText} >Or connect with</Text>
            <View style={styles.socialButtonsContainer}>
                <View style={{paddingHorizontal:10}} >
                  <StyledButton 
                    title="Facebook" 
                    roundEdged 
                    height={40} 
                    backgroundColor="#3B5998" 
                    fontSize={20} 
                    width={135} 
                    LeftIcon={()=>(
                      <Icon name="logo-facebook" size={25} color="white" />
                    )}
                    onPress={this.facebookLogin}
                    loading={this.state.isFbLoading}
                    />
                </View>
                <View style={{paddingHorizontal:10}} >
                  <StyledButton 
                    title="Google" 
                    roundEdged 
                    height={40} 
                    backgroundColor="#DD4B39" 
                    fontSize={20} 
                    width={135} 
                    LeftIcon={()=>(
                      <Icon name="logo-google" size={25} color="white" />
                    )}  
                    onPress={this.googleLogin}
                    loading={this.state.isGoogleLoading}
                    />
                </View>
                
              </View>
          </View>
          <Toast message={this.state.msg} visible={this.state.toggleToast} />
          <Loading visible={this.state.isFbLoading || this.state.isGoogleLoading} />
        </View>
      </>
    );
  }
};


export default connect(mapStateToProps)(Auth)

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
  socialButtonsContainer:{
    flexDirection:"row",
    justifyContent:"center",
    paddingVertical:30
   
  },
  authButtonContainer:{
    flexDirection:"row",
    justifyContent:"center",
    paddingVertical:30
   
  },

  orConnectWithText:{
    color:"#989595",
  },

});
