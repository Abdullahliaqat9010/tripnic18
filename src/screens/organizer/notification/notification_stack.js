import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import NotificationMain from './notification_main'
import Request from './request'
const Stack = createStackNavigator()

const NotificationStack = ({navigation,route})=>{
    if(route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible:false})
    }
    else{
        navigation.setOptions({tabBarVisible:true})
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={NotificationMain}/>
            <Stack.Screen name="Request" component={Request}
                options={{
                    headerTitleContainerStyle: {
                        left: 50,
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default NotificationStack