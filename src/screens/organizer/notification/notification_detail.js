import React from 'react'
import {View,Text, Button, Image} from 'react-native'
import { SafeAreaView, FlatList, StyleSheet,ScrollView, } from 'react-native';
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {Toast} from '../../../components/styled_components'
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler';


const Title = 'Trip to Muree'
var DATA = [
    {
      LatestTime: moment().subtract(1, 'hour'),
      Name: 'Abdullah Liaqat',
      Email : '21100270@gmail.com',
      Mobile : '03001234567',
      isPending: true,
      isAccepted: false,
      isRejected: false,

    },
    {
        LatestTime: moment().subtract(10, 'days'),
        Name: 'Muhammad Bilal',
        Email : '21100263@gmail.com',
        Mobile : '03001112223',
        isPending: true,
        isAccepted: false,
        isRejected: false,
  
      },
    {
        LatestTime: moment().subtract(3, 'days'),
        Name: 'Zahan Wasif',
        Email : '21100212@gmail.com',
        Mobile : '03110002223',
        isPending: true,
        isAccepted: false,
        isRejected: false,
    },
    { 
        LatestTime: moment().subtract(25, 'months'),
        Topic: 'Trip to Chitral',
        NewNotification : false,
        Name: 'Muhammad Waseem',
        Email : 'waseem@gmail.com',
        Mobile : '03220001122',
        isPending: true,
        isAccepted: false,
        isRejected: false,
    },
  ];
  var enableEarlier = true

  function Item({DataItem}) {
  
    if (DataItem.isPending)
    { 
    return (
        <View style = {{ padding :10, marginVertical: 8, marginHorizontal: 16}}>
        <Text style = {{ alignSelf: 'center', margin:5}}> {DataItem.LatestTime.toDate().toString()}</Text> 
        <View style={{Font : 15,  padding: 5,paddingRight:10, paddingRight:10,borderColor: '#D3D3D3', borderWidth:1, borderRadius:25,}}>
        <View style = {{flexDirection : 'row'}}>      
        <View style = {{ width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: '#D3D3D3',
          marginTop : 5,
          justifyContent: "center",
          alignItems: "center"}}>
          <Text style = {{}}>{DataItem.Name[0]}</Text>
        </View>
        <View >  
        <Text style={styles.title}>{DataItem.Name}</Text>
        <Text style = {{paddingLeft:20}}> {DataItem.Email}</Text>
        <Text style = {{paddingLeft:20}}> {DataItem.Mobile}</Text>
        <View  style = {{alignContent : 'flex-end', marginHorizontal:20}}>
        <View style = {{ marginTop : 5,flexDirection : 'row'}}>
        <View>
        <Button 
        onPress={
        ()=>{
        DataItem.isPending = false
        DataItem.isAccepted = true
        }
        }
        title="Accept"
        color="#008000"
       />
       </View>
     
       <View style = {{alignContent : 'flex-end', marginHorizontal:20}}>
       <Button style = {{marginTop:3}}
        onPress={
        ()=>{
            DataItem.isPending = false
            DataItem.isRejected = true
        }
        }
        title="Reject"
        color="#8B0000"
      />
      </View>
      </View>
      </View> 
      </View>
      </View>
      </View>
      </View>
      
    );
  }
  return (
  <View></View>
  );
}
  function sortByNum(a, b) {
    const diff = a.LatestTime - b.LatestTime;

    return -1 * diff;
}

export default class NotificationDetail extends React.Component{
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
        var pendingNotification = 0
        for(let i =0; i<data1.length;i++) {
        if (data1[i].isPending)
        {pendingNotification= pendingNotification+ 1}
        }
        return(
            <ScrollView  scrollEnabled={this.state.enableScrollViewScroll} style = {{backgroundColor : 'white'}}>
            <SafeAreaView style={{flex : 1}}>
            <ScrollView onTouchStart={(ev) => { 
			this.setState({enabled:false }); }}
			onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
			onScrollEndDrag={(e) => { this.setState({ enabled:true }); }} >
            <View style = {{Font : 'Bold', marginTop : 2, marginBottom:2,flexDirection : 'row', borderColor: '#D3D3D3', borderWidth: 1,}}>
            <TouchableOpacity style={{alignItems: 'center',  justifyContent: 'center'}} activeOpacity={0.5}>
            <Image
             source={require('../../../assets/BackButton.png')}
             style={{}} />
            </TouchableOpacity>
            <Text style = {{paddingLeft : 10, fontSize: 30}}>{Title}</Text>
            </View>
            <View style = {{fontSize: 10, Font : 'Bold', marginTop : 5, marginBottom:5,}}>
            <Text style = {{paddingLeft : 10}}>Pending Notification = {pendingNotification}</Text>
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