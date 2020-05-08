import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileMain from './profile_main'
import Phone from './edit_phone.js'
import Profile from './edit_profile'
import Company from './edit_company'
const Stack = createStackNavigator()

const ProfileStack = ({navigation,route})=>{
    if(route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible:false})
    }
    else{
        navigation.setOptions({tabBarVisible:true})
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileMain}/>
            <Stack.Screen name="Edit Profile" component={Profile}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
            <Stack.Screen name="Edit Company Info" component={Company}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
            <Stack.Screen name="Edit Phone" component={Phone}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack