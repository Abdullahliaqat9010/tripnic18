import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileMain from './profile_main'
import Edit from './edit_profile'
import Phone from './edit_phone'
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
            <Stack.Screen name="Edit Profile" component={Edit}
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