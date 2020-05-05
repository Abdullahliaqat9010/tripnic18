import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStack from '../../screens/traveller/home/home_stack'
import ProfileStack from '../../screens/traveller/profile/profile_stack'
import InboxStack from '../../screens/traveller/inbox/inbox_stack'
import NotificationStack from '../../screens/traveller/notification/notification_stack'
import TripsStack from '../../screens/traveller/trips/trips_stack'

//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator()
const OrganizerMainAppScreens = ()=>{
  return (
    <Tab.Navigator
    
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor:"#2BB396",
        inactiveTintColor:"black"
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel:({focused,color})=>(
            focused?<Text style={{color:color,fontSize:10,paddingBottom:2}} >Home</Text>:null
         ),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTrips"
        component={TripsStack}
        options={{
          tabBarLabel:({focused,color})=>(
            focused?<Text style={{color:color,fontSize:10,paddingBottom:2}} >MyTrips</Text>:null
         ),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-paper-plane" color={color} size={24} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={{
          
          tabBarIcon: ({ color }) => (
            <Icon name="md-chatbubbles" color={color} size={24} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarLabel:({focused,color})=>(
            focused?<Text style={{color:color,fontSize:10,paddingBottom:2}} >Notifications</Text>:null
         ),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={24} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel:({focused,color})=>(
            focused?<Text style={{color:color,fontSize:10,paddingBottom:2}} >Profile</Text>:null
         ),
          tabBarIcon: ({ color }) => (
            <Icon name="md-person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default OrganizerMainAppScreens