import React,{useCallback,useEffect,useState} from 'react'
import {StyleSheet,View,Dimensions,TextInput,Text,Alert,BackHandler} from 'react-native';
import {store} from '../../redux/store';
import {addCompanyInfo} from '../../redux/actions/auth_actions'
import {validateCompanyInfo} from '../../components/validations'
import Loading from '../common/loading'
import { Toast,StyledButton } from '../../components/styled_components';
import { useFocusEffect } from '@react-navigation/native';

const {width} = Dimensions.get('window')

const AboutCompany = (props)=>{
    
  const [companyName,setCompanyName] = useState("")
  const [about,setAbout] = useState("")
  const [msg,setMsg] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [toggleToast,setToggleToast] = useState(false)
  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Warning","Are you sure you want to leave Signup?",[{
          text:"Yes",
          onPress: async ()=>{
            try {
              await store.dispatch(signout())
              console.log("logged out")
              props.navigation.popToTop()
            } catch (error) {
              console.log(error)
            }
          }
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

  const AddCompanyInfo = async ()=>{
        try {
            validateCompanyInfo(companyName,about)
            setIsLoading(true)
            await store.dispatch(addCompanyInfo(companyName,about))
            setIsLoading(false)
            props.navigation.navigate("Phone")
        } 
        catch (error) {
            console.log(error)
            setIsLoading(false)
            setMsg(error)
            setToggleToast(true)
        }
    }

        return(
            <View style={styles.container} >
          <View style={styles.iconLeft} >
            
          </View>
          <View style={styles.interactionContainer}>
            <View style={{justifyContent:"flex-start", width:width, paddingLeft:40}} >
              <Text style={{fontSize:22,fontWeight:"bold"}}>Company Info</Text>
            </View>
            <View style={styles.input} >
              <TextInput style={styles.inputText} 
              onChangeText={(companyName)=>{
                setCompanyName(companyName)
              }}
              placeholder="Enter Company Name" />
            </View>
            <View style={styles.inputMultiline} >
              <TextInput style={styles.inputTextMultiline}
                multiline 
                onChangeText={(about)=>{
                  setAbout(about)
                }}
                placeholder="About Your Company (max 500 words)" />
            </View>
            <View style={styles.authButtonContainer}>
                {/* <TouchableOpacity activeOpacity={0.9} style={styles.organizerLoginButton
                  } onPress={this.AddCompanyInfo} >
                  <Text style={styles.ButtonText} >Add Info</Text>
                </TouchableOpacity> */}
                <StyledButton
                  title="Add Info"
                  onPress={AddCompanyInfo}
                  roundEdged
                  width={135}
                  height={40}
                  fontSize={20}
                  loading={isLoading}
                />
              </View>
           
          </View>
          <Loading visible={isLoading} />
          <Toast message={msg} visible={toggleToast} />
        </View>
        )
    }

export default AboutCompany

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
    googleButton:{
      backgroundColor:"#DD4B39",
      width:135,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      marginLeft:5
    },
    fbButton:{
      backgroundColor:"#3B5998",
      width:135,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      marginRight:5
    },
    authButtonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      paddingVertical:30
     
    },
    organizerSignupButton:{
      backgroundColor:"#2F9AE3",
      width:135,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      marginLeft:5
    },
    organizerLoginButton:{
      backgroundColor:"#2F9AE3",
      width:135,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      marginRight:5
    },
    travellerSignupButton:{
      backgroundColor:"#2BB396",
      width:135,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10,
      marginLeft:5
    },
    travellerLoginButton:{
      backgroundColor:"#2BB396",
      width:135,
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
    inputMultiline:{
        width:width-(2*40),
        borderWidth:1,
        marginTop:20,
        borderRadius:10,
        borderColor:"#A7A5A5",
        paddingLeft:10,
        justifyContent:"flex-start",
        height:200
    },
    inputText:{
      fontSize:16,
      color:"black"
    },
    inputTextMultiline:{
        fontSize:16,
      color:"black",
      textAlignVertical:"top"
    }
})  