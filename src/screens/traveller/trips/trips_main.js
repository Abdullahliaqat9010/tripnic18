import React from 'react'
import {View,Text, Button,Dimensions} from 'react-native'
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {StyledButton,StyledTextInput, OTPInput,StyledPicker} from '../../../components/styled_components'
import Icon from 'react-native-vector-icons/Ionicons'
const {width} = Dimensions.get('window')


export default class TripsMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
         
        }
    }
 

    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <StyledButton title="logout" onPress={()=>{
                    store.dispatch(signout())
                }} />
            </View>
        )
    }
}