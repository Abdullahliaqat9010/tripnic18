import React from 'react';
import {StyleSheet,View,Text,Alert} from 'react-native';
import {store} from '../../redux/store';
import {navigateToMainApp, signout, validateUserOnStart } from '../../redux/actions/auth_actions'

export default class AppLoading extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        networkError:false
      }
  }
  
  componentDidMount(){
    this.updateFunction()
  }


  updateFunction = async()=>{
    try {
      const isUserValid = await store.dispatch(validateUserOnStart())
      if(isUserValid !== null){
        if(isUserValid){
          store.dispatch(navigateToMainApp())
        }
        else{
          await store.dispatch(signout())
          this.updateFunction()
        }
      }
      else{
        this.props.navigation.navigate("ChooseRole")
      }
    } 
    catch (error) {  
      //console.log(error)
      Alert.alert("Error:",error,[
        {
          text: "Retry",
          onPress: () => this.updateFunction(),
          style: "cancel"
        }
      ])  
    }
  }

  
  render(){
    return(
      <View style={styles.container}>
        <Text>Loading App...</Text>
      </View>
    ) 
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

});

