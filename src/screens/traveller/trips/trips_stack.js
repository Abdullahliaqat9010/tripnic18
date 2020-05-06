import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripsMain from './trips_main'
import PreviewTrip from '../common/preview_trip'
const Stack = createStackNavigator()

const TripsStack = ()=>{
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