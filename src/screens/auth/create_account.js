import React from 'react';
import {StyleSheet,View,Dimensions,TextInput,TouchableOpacity,Text} from 'react-native';
import {Picker} from '@react-native-community/picker'
import { connect } from 'react-redux';
import {store} from '../../redux/store';
import {createUser,navigateToMainApp} from '../../redux/actions/auth_actions'
import Loading from '../common/loading'
import Icon from 'react-native-vector-icons/Ionicons'
import {StyledButton,StyledPicker,StyledTextInput,Toast} from '../../components/styled_components'

const {width} = Dimensions.get('window')


const mapStateToProps = (state)=>{
  //console.log(state.firebaseReducer.auth.email)
  return{
    email:state.firebaseReducer.auth.email,
    isOrganizer:state.authReducer.isOrganizer,
  };
}

const CustomePicker = (props)=>{
  const [selectedValue,setSelectedValue] = React.useState("Not Specified")
  return(
    <Picker
        mode="dropdown"
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


class CreateAccount extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
            email:this.props.route.params.email?this.props.route.params.email:this.props.email,        
            picUrl:null,
            name:"",
            city:"",
            msg:"",
            toggleToast:false,
            gender:"",
            isLoading:false,
            genderOptions:[
              "Not Specified",
              "Male",
              "Female",
              "Other",
            ],
            cityOptions:[
              "Not Specified",
              "Lahore",
              "Karachi",
              "Islamabad",
            ]
    }
}
  SelectGender = (gender)=>{
    //console.log(gender)
    this.setState({gender:gender})
    //console.log(this.state.gender)
  }  

  SelectCity = (city)=>{
   
    this.setState({city})
  }
   createUser = async()=>{
      //console.log(this.props)
       try {
            const userProfile = {
              name:this.state.name,
              email:this.state.email,
              gender:this.state.gender,
              city:this.state.city,
              profilePicture:this.state.picUrl,
            }
            this.setState({isLoading:true})
            await store.dispatch(createUser(userProfile,this.props.isOrganizer))
            this.setState({isLoading:false})
            if(this.props.isOrganizer){
              this.props.navigation.navigate("AboutCompany")
            }
            else{
              store.dispatch(navigateToMainApp())
              //this.props.navigation.navigate("Phone")
            }
               
       } 
       catch (error) {
        this.setState({isLoading:false})
        console.log(error)
        //Alert.alert(error)   
       }
   }

  render(){
    return (
      <>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={styles.container} >
          <View style={styles.iconLeft} >
            {/* <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back" size={40} /> */}
          </View>
          <View style={styles.interactionContainer}>
            <View style={{justifyContent:"flex-start", width:width, paddingLeft:40}} >
              <Text style={{fontSize:22,fontWeight:"bold"}}>Create Account</Text>
            </View>
            <View style={styles.input} >
              <TextInput style={styles.inputText} 
              onChangeText={(email)=>{
                this.setState({email})
              }}
              defaultValue={this.state.email}
              placeholder="Enter your Email Address" />
            </View>
            <View style={styles.input} >
              <TextInput  style={styles.inputText} 
              onChangeText={(name)=>{
                this.setState({name})
              }}
              placeholder="Enter Your Full Name" />
            </View>
            <View style={styles.dropdownContainer} >
              <View style={{justifyContent:"center"}}>
                <Text style={styles.inputText} >City</Text>
              </View>
              <View style={{flex:1,alignItems:"flex-end"}} >
                <CustomePicker options={this.state.cityOptions} select={this.SelectCity} />
              </View>
            </View>
            
            <View style={styles.dropdownContainer} >
              <View style={{justifyContent:"center"}}>
                <Text style={styles.inputText} >Gender</Text>
              </View>
              <View style={{flex:1,alignItems:"flex-end"}} >
                <CustomePicker options={this.state.genderOptions} select={this.SelectGender} />
              </View>
            </View>
            <View style={styles.authButtonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={
                  this.props.isOrganizer?styles.organizerCreateAccountButton:styles.travellerCreateAccountButton
                  } onPress={this.createUser} >
                  <Text style={styles.ButtonText} >Create Account</Text>
                </TouchableOpacity>
              </View>
           
          </View>
          <Loading visible={this.state.isLoading} />
        </View>
        
        {/* <View style={styles.container}>
          
          <TextInput onChangeText={(name)=>{
              this.setState({name})
          }}
          placeholder="Name"
          />
          <TextInput onChangeText={(name)=>{
              this.setState({name})
          }}
          placeholder="Email"
          defaultValue={this.state.email}
          />

          <CustomePicker options={this.state.genderOptions} select={this.SelectGender} />
          <CustomePicker options={this.state.cityOptions} select={this.SelectCity} />
          <Button title="Create Account" onPress={this.createUser}></Button>
          <Loading visible={this.state.isLoading} />
        
        </View> */}
      </>
    );
  }
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


