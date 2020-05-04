import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,StatusBar,Switch, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import { facebookLogin, googleLogin, validateUser, navigateToMainApp,changeRole } from '../../redux/actions/auth_actions'
import Loading from '../common/loading'
import {StyledButton,Toast} from '../../components/styled_components'
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = (state)=>{
  //console.log(state.firebaseReducer.auth.providerData)
  return{
    isOrganizer:state.authReducer.isOrganizer,
  };
}

class Start extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentUser:this.props.isOrganizer?require("../../assets/organizerBG.png"):require("../../assets/travellerBG.png"),
      isFbLoading:false,
      isGoogleLoading:false,
      msg:"",
      toggleToast:false
    }
}
 
componentDidUpdate(prevProps){
  if(prevProps.isOrganizer !== this.props.isOrganizer){
    this.setState({
      currentUser:this.props.isOrganizer?require("../../assets/organizerBG.png"):require("../../assets/travellerBG.png")  
    })
  }
}

switchAccountType = ()=>{
  store.dispatch(changeRole(!this.props.isOrganizer))
}

facebookLogin = async ()=>{
    try {
      this.setState({isFbLoading:true})
        await facebookLogin()
        var profileExists = await store.dispatch(validateUser(this.props.isOrganizer))
        if(profileExists){
            //go to main app
            store.dispatch(navigateToMainApp())
            this.setState({isFbLoading:false})
        }
        else{
            //go to signup
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
      //alert(error)
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
            //go to signup
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
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{flex:1}}>
          <View style={styles.background}>
            <ImageBackground style={styles.backgroundImage} source={this.state.currentUser} >
              <Text style={styles.logoText}>TRIPNIC</Text>
              <Text style={styles.welcomeText}>Welcome</Text>
              <View style={{width:270}}>
                <Text style={styles.welcomeMsg}>
                  {
                    this.props.isOrganizer?
                    'Want to grow your business? Let us help you reaching out tourists':
                    'Why wait? Let us get started to access hot offers on amazing trips'
                    
                  }
                </Text>
              </View>
                <View style={{marginBottom:-15}}>
                  <StyledButton 
                    roundEdged 
                    backgroundColor="white" 
                    title={
                      this.props.isOrganizer?"Enter your Bussiness Email":"Enter Your Email Address"
                    } 
                    width={300}
                    height={50}
                    textColor="#979292"
                    fontSize={20}
                    onPress={()=>this.props.navigation.push("Auth")}
                    />
                </View>
            </ImageBackground>
          </View>
          <View style={styles.interactionContainer}>
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
              <View style={{width:300,paddingVertical:20}}>
                <Text style={styles.termsText}>{`By proceeding you agree to Tripnic's Privacy Policy, User Agreement and Terms of Service`}</Text>
              </View>
              <ImageBackground style={styles.switchContainer} source={this.state.currentUser} >
                <View style={styles.switchTextContainer}>
                  <Text style={styles.switchText}>Traveller</Text>
                </View>
                <View style={styles.container}>
                  <Switch
                    thumbColor="white"
                    trackColor={{true:"rgba(255,255,255,0.3)",false:"rgba(255,255,255,0.3)"}}
                    value={this.props.isOrganizer}
                    onValueChange={this.switchAccountType}
                    />
                </View>
                <View style={styles.switchTextContainer}>
                <Text style={styles.switchText} >Organizer</Text>
                </View>
              </ImageBackground>
            
          </View>
          <Toast message={this.state.msg} visible={this.state.toggleToast} />
          <Loading visible={this.state.isFbLoading || this.state.isGoogleLoading} />
        </View>
      </>
    );
  }
};


export default connect(mapStateToProps)(Start)

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  background:{
    flex:6
  },
  backgroundImage:{
    flex: 1,
    resizeMode: "cover",
    alignItems:"center",
    justifyContent:"flex-end"
  },
  interactionContainer:{
    flex:5,
    justifyContent:"flex-end",
    alignItems:"center"
  },
  switchContainer:{
    height:50,
    flexDirection:"row"
  },
  switchText:{
    color:"white",
    fontSize:18
  },
  switchTextContainer:{
    flex:3,
    alignItems:'center',
    justifyContent:'center',
  },
  logoText:{
    fontSize:50,
    color:"white",
  },
  welcomeText:{
    paddingTop:30,
    fontSize:30,
    color:"white",
  },
  welcomeMsg:{
    paddingTop:30,
    paddingBottom:20,
    fontSize:17,
    color:"white",
    textAlign:"center"
  },
  socialButtonsContainer:{
    flexDirection:"row",
    justifyContent:"center",
    paddingBottom:30
  },
  termsText:{
    color:"#989595",
    textAlign:"center"
  },
  orConnectWithText:{
    color:"#989595",
    paddingBottom:20
  }

});

