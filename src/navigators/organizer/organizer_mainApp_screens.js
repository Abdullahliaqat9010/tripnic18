import React from 'react'
import {Text} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStack from '../../screens/organizer/home/home_stack'
import ProfileStack from '../../screens/organizer/profile/profile_stack'
import NotificationStack from '../../screens/organizer/notification/notification_stack'
import TripsStack from '../../screens/organizer/trips/trips_stack'
//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator()
const OrganizerMainAppScreens = ()=>{
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor:"#2F9AE3",
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
          )
        }}
      />
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