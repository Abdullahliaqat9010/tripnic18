import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AppLoadingStack from './AppLoading/app_loading_stack'
import AppAuthStack from './AppAuth/app_auth_stack'
import { connect } from 'react-redux';
import OrganizerMainAppScreens from './organizer/organizer_mainApp_screens';
import TravellerMainAppScreens from './traveller/traveller_mainApp_screens'

const ChooseAppMode = ({isOrganizer,isLoggedIn}) => {
    if(isOrganizer === null){
        return(
            <AppLoadingStack/>
        )   
    }
    else{
        if(isLoggedIn){
            if(isOrganizer){
                return(
                    <OrganizerMainAppScreens/>
                )
            }
            else{
                return(
                    <TravellerMainAppScreens/>
                )   
            }
        }
        else{
            return <OrganizerMainAppScreens/>
        }
    }
}

const AppContainer = () =>{
    return(
        <NavigationContainer>
           <ModeContainer/>
        </NavigationContainer>
    )
}

const ModeContainer = connect(state=>({
    isOrganizer:state.authReducer.isOrganizer,
    isLoggedIn:state.authReducer.isLoggedIn
}))(ChooseAppMode)

export default AppContainer
