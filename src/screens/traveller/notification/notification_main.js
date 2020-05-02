import React from 'react'
import {View,Text, Button} from 'react-native'
import { SafeAreaView, FlatList, StyleSheet,ScrollView, } from 'react-native';
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {Toast} from '../../../components/styled_components'
import moment from "moment";

const DATA = [
    {
      LatestTime: moment().subtract(1, 'hour'),
      Topic: 'Trip to Kashmir',
      NewNotification : false,
      Company_name: 'Travelia',
      description1: 'Pack you bags and have a safe trip.',
      description2 : 'invited you for their'

    },
    {
        LatestTime: moment().subtract(10, 'days'),
        Topic: 'Trip to Swat',
        NewNotification : false,
        Company_name: 'Alpine Travels',
        description1: 'Pack you bags and have a safe trip.',
        description2 : 'invited you for their'
  
      },
    {
        LatestTime: moment().subtract(3, 'days'),
        Topic: 'Trip to Kaghan',
        NewNotification : false,
        Company_name: 'LAS',
        description1: 'Pack you bags and have a safe trip.',
        description2 : 'invited you for their'
    },
    { 
        LatestTime: moment().subtract(25, 'months'),
        Topic: 'Trip to Chitral',
        NewNotification : false,
        Company_name: 'LCS',  
        description1: 'Pack you bags and have a safe trip.',
        description2 : 'invited you for their'
    },
    {
        LatestTime: moment().subtract(7, 'minute'),
        Topic: 'Trip to Muree',
        NewNotification : false,
        Company_name: 'Trip maro',
        description1: 'Pack you bags and have a safe trip.',
        description2 : 'invited you for their'
    },
  ];
  var enableEarlier = true

  function Item({DataItem}) {
    var duration = DataItem.LatestTime.fromNow() 
    var now = moment();
    var diff = now.diff(DataItem.LatestTime, 'days')
    
    if (diff>=1 && enableEarlier)
    {
        enableEarlier = false
        return (
            <View>
            <View style = {{fontSize: 10, Font : 'Bold', marginTop : 3, marginBottom:3,}}>
            <Text>Earlier</Text>
           </View>
          <View style={{Font : 15,  padding: 20, marginVertical: 8, marginHorizontal: 16, flexDirection : 'row'}}>
            <View style = {{ width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: '#D3D3D3',
              marginTop : 5,
              justifyContent: "center",
              alignItems: "center"}}>
             <Text style = {{}}>{DataItem.Topic[0]}</Text>
            </View>
            <View >  
            <Text style={styles.title}>{DataItem.Topic}</Text>
            <Text style = {{paddingLeft:20, paddingRight :20}}> {DataItem.description1} {DataItem.Company_name} {DataItem.description2} {DataItem.Topic} </Text> 
            <Text style = {{paddingLeft:20}}> {duration}</Text>
            </View>
          </View>
          </View>
        );
    }
    
    return (
      <View style={{Font : 15,  padding: 20, marginVertical: 8, marginHorizontal: 16, flexDirection : 'row'}}>
        <View style = {{ width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: '#D3D3D3',
          marginTop : 5,
          justifyContent: "center",
          alignItems: "center"}}>
         <Text style = {{}}>{DataItem.Topic[0]}</Text>
        </View>
        <View >  
        <Text style={styles.title}>{DataItem.Topic}</Text>
        <Text style = {{paddingLeft:20}}> {DataItem.description1} {DataItem.Company_name} {DataItem.description2} {DataItem.Topic} </Text> 
        <Text style = {{paddingLeft:20}}> {duration}</Text>
        </View>
      </View>
    );
  }
  function sortByNum(a, b) {
    const diff = a.LatestTime - b.LatestTime;

    return -1 * diff;
}

export default class NotificationMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            enableScrollViewScroll: true,
        }
    }
    onEnableScroll= (value) => {

        this.setState({
        
        enableScrollViewScroll: value,
        
        });
        
        };
    
    render(){
        var data1=DATA
        data1.sort(sortByNum)
        enableEarlier = true
        return(
            <ScrollView  scrollEnabled={this.state.enableScrollViewScroll} style = {{backgroundColor : 'white'}}>
            <SafeAreaView style={{flex : 1}}>
            <ScrollView onTouchStart={(ev) => { 
			this.setState({enabled:false }); }}
			onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
			onScrollEndDrag={(e) => { this.setState({ enabled:true }); }} >
            <View style = {{fontSize: 10, Font : 'Bold', marginTop : 3, marginBottom:3,}}>
             <Text>Today</Text>
            </View>
            <FlatList 
             
              data = {DATA}
             // data.sort(sortByNum)
              renderItem={({ item }) => <Item DataItem={item} /> }
              keyExtractor={item => item.LatestTime}
             
            />
            </ScrollView>
          </SafeAreaView>
          </ScrollView>
        )
        
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //  marginTop: Constants.statusBarHeight,
    },
    item: {
      //backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 15,
      paddingLeft:20
    },
  });