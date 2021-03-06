import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity,Text} from 'react-native'
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './home'
import Settings from './settings'
import Search from './search'
import PreviewTrip from '../common/preview_trip'
const Stack = createStackNavigator()

const HomeStack = ({navigation,route})=>{
    if(route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible:false})
    }
    else{
        navigation.setOptions({tabBarVisible:true})
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={({navigation})=>({
                    // headerRight:()=>{
                    //     return (
                    //         <Icons
                    //                 onPress={()=>navigation.push("Settings")} 
                    //                 name="ios-settings" 
                    //                 size={30}
                    //                 style={{paddingRight:15}} 
                    //         />
                    //     )  
                    // }
                })}
            />
            <Stack.Screen name="Settings" component={Settings}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
            <Stack.Screen name="Preview" component={PreviewTrip}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
            <Stack.Screen name="Search" component={Search}
            options={()=>({
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            })}
            />
        </Stack.Navigator>
    )
}

export default HomeStack