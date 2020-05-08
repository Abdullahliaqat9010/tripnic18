import React from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';
import { connect } from 'react-redux';
import {changeRole} from '../../redux/actions/auth_actions'
import {StyledButton} from '../../components/styled_components'



const mapDispatchToProps = (dispatch)=>{
  return{
    changeRole: (role)=>{dispatch(changeRole(role))},
  };
}


class ChooseRole extends React.Component {
    constructor(props){
        super(props);
    }
    
    
  render(){
    return (
      <View style={styles.container}>
         <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",marginBottom:100}}>
         <Image source={require('../../assets/logo_black.png')} />
           
        </View> 
       <View style={styles.buttonContainer}>
       <View style={{flex:1,paddingHorizontal:20}}>
          {/* <Button title="Organizer" onPress={()=>this.props.changeRole(true)} /> */}
          <StyledButton roundEdged fontSize={20} backgroundColor="#2F9AE3" title="Organizer" onPress={()=>this.props.changeRole(true)} />
        </View>
        <View style={{flex:1,paddingHorizontal:20}}>
          {/* <Button title="Traveller" onPress={()=>this.props.changeRole(false)} /> */}
          <StyledButton roundEdged fontSize={20} backgroundColor="#2F9AE3" title="Traveller" onPress={()=>this.props.changeRole(false)} />
        </View>
       </View>
        
      
      </View>
    );
  }
}


export default connect(state=>({}),mapDispatchToProps)(ChooseRole)

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"white"
  },
  buttonContainer:{
    flex:1,
    flexDirection:"row",
    alignItems:'flex-end',
    justifyContent:'center',
    paddingBottom:50
  },

});

