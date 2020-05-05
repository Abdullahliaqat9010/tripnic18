import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import NotificationMain from './notification_main'
import NotificationDetail from './notification_detail'
const Stack = createStackNavigator()

const NotificationStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={NotificationDetail}/>
        </Stack.Navigator>
    )
}

export default NotificationStack