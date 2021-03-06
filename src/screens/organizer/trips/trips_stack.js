import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripsMain from './trips_main'
import AddTrip from './add_trip'
import EditTrip from './edit_trip'
import AddSchedule from './add_schedule'
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
        <Stack.Navigator >
            <Stack.Screen name="My Trips" component={TripsMain}/>
            <Stack.Screen name="Add Trip" component={AddTrip}
                options={{
                    headerTitleContainerStyle: {
                        left: 50,
                    },
                }}
            />
            <Stack.Screen name="Edit Trip" component={EditTrip}
                options={{
                    headerTitleContainerStyle: {
                        left: 50,
                    },
                }}
            />
            <Stack.Screen name="Add Schedule" component={AddSchedule}
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
        </Stack.Navigator>
    )
}

export default TripsStack