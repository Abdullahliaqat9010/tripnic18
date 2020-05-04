import React from 'react'
import {View,Text,TouchableOpacity,Image, Dimensions,FlatList,StyleSheet,Alert} from 'react-native'
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {FAB} from 'react-native-paper'
import AddTrip from './add_trip'
import Icon from 'react-native-vector-icons/Ionicons'
const {width} = Dimensions.get("window")


const TripCard = ({trip})=>{
    return(
        <TouchableOpacity 
            onLongPress={()=>{
                Alert.alert('','Edit or Delete this trip',[
                    {
                        text:"Edit",
                        onPress:()=>{console.log("Edit")}
                    },
                    {
                        text:"Delete",
                        onPress:()=>{
                            console.log("Delete")
                            Alert.alert('','Are you sure you want to delete?',[
                                {
                                    text:"Yes",
                                    onPress:()=>{
                                        console.log("yes")
                                    }
                                },
                                {
                                    text:"No",
                                    onPress:()=>{
                                        console.log("No")
                                    }
                                }
                            ])
                        }
                    }
                ])
            }}
            activeOpacity={0.9}
            style={{
                width:width-20,
                height:150,
                backgroundColor:"white",
                borderRadius:10,
                elevation:5,
                flexDirection:"row"
                }} >
            
                <Image
                    source={{uri:trip.thumbnail}}
                    style={{flex:4,borderBottomLeftRadius:10,borderTopLeftRadius:10}}
                />
           
            <View style={{flex:3,paddingHorizontal:10,justifyContent:"center"}} >
                <Text style={{fontSize:17,fontWeight:"bold",marginBottom:10}} >{trip.title}</Text>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="ios-timer" size={15} />
                    <Text style={{marginLeft:5}} >{trip.duration+' days'}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="md-person" size={15} />
                    <Text style={{marginLeft:5}} >{trip.capacity}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="ios-pricetag" size={15} />
                    <Text style={{marginLeft:5}} >{trip.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default class TripsMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            refreshing:false,
           data:[
               {
                id:"1",   
                title:"Trip Title to naran and Kaghan",
                thumbnail:"https://firebasestorage.googleapis.com/v0/b/tripnic-18.appspot.com/o/02m5BVeBgi4q9bPE89g5%2FIMG-20200502-WA0023.jpg?alt=media&token=69660376-18c6-4a97-b16e-a203baceeff2",
                discount:10,
                price:500,
                rating:4.5,
                duration:10,
                capacity:4
                },
                {
                id:"2",    
                title:"Trip Title",
                thumbnail:"https://firebasestorage.googleapis.com/v0/b/tripnic-18.appspot.com/o/02m5BVeBgi4q9bPE89g5%2FIMG-20200502-WA0023.jpg?alt=media&token=69660376-18c6-4a97-b16e-a203baceeff2",
                discount:10,
                price:500,
                rating:4.5,
                duration:10,
                capacity:4
                },
                {
                id:"3",    
                title:"Trip Title",
                thumbnail:"https://firebasestorage.googleapis.com/v0/b/tripnic-18.appspot.com/o/02m5BVeBgi4q9bPE89g5%2FIMG-20200502-WA0023.jpg?alt=media&token=69660376-18c6-4a97-b16e-a203baceeff2",
                discount:10,
                price:500,
                rating:4.5,
                duration:10,
                capacity:4
                },
                {
                id:"4",    
                title:"Trip Title",
                thumbnail:"https://firebasestorage.googleapis.com/v0/b/tripnic-18.appspot.com/o/02m5BVeBgi4q9bPE89g5%2FIMG-20200502-WA0023.jpg?alt=media&token=69660376-18c6-4a97-b16e-a203baceeff2",
                discount:10,
                price:500,
                rating:4.5,
                duration:10,
                capacity:4
                }
            ]
        }
    }

    
    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
            
               <FlatList
                    style={{width:width}}
                    contentContainerStyle={{alignItems:"center"}}
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={()=>{
                        return(
                            <View style={{justifyContent:"center",height:50}} >
                                <Text style={{color:"#A7A5A5"}} >Tap and Hold for more options</Text>
                            </View>
                        )
                    }}
                    onEndReached={()=>{
                        console.log("end reached")
                    }}
                    ListFooterComponent={()=>{
                        return(
                            <View style={{height:50}} />
                        )
                    }}
                    onEndReachedThreshold={0.1}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{
                        this.setState({refreshing:false})
                    }}
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{height:10}} />
                        )
                    }}
                    renderItem={(item)=>{
                        return(
                            <TripCard trip={item.item} />
                        )
                    }}
                    keyExtractor={(item)=>item.id}
               />
                
                <FAB
                    style={styles.fab}
                    icon="plus"
                    color="white"
                    onPress={() => this.props.navigation.navigate("Add Trip")}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"#2F9AE3"
    },
  })
  