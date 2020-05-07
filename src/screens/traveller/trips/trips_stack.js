import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripsMain from './trips_main'
import PreviewTrip from './preview_trip'
const Stack = createStackNavigator()

const TripsStack = ({navigation,route})=>{
    if(route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible:false})
    }
    else{
        navigation.setOptions({tabBarVisible:true})
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="My Trips" component={TripsMain}/>
            <Stack.Screen name="Preview" component={PreviewTrip}
            options={{
                
                headerTitleContainerStyle: {
                    left: 50,
                },
            }}
            />
        </Stack.Navigator>
        
    )
}

export default TripsStack