import React from 'react'
import {View,Text,TouchableOpacity,Image, Dimensions,FlatList,StyleSheet,Alert} from 'react-native'
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {FAB} from 'react-native-paper'
import AddTrip from './add_trip'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchTrips} from '../../../redux/actions/app_actions'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
const {width} = Dimensions.get("window")



const TripCard = ({trip,navigateToEditTrip,deleteTrip})=>{
    return(
        <TouchableOpacity 
            onLongPress={()=>{
                Alert.alert('','Edit or Delete this trip',[
                    {
                        text:"Edit",
                        onPress:()=>{
                            navigateToEditTrip(trip.id)
                        }
                    },
                    {
                        text:"Delete",
                        onPress:()=>{
                            Alert.alert('','Are you sure you want to delete?',[
                                {
                                    text:"Yes",
                                    onPress:()=>{
                                        deleteTrip(trip.id)
                                    }
                                },
                                {
                                    text:"No",
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
            loading:false,
           data:[
               
            ]
        }
    }

    navigateToEditTrip = (id)=>{
        this.props.navigation.navigate("Edit Trip")
    }
    deleteTrip = async (id)=>{
        console.log("fetching")
        await fetch('https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb')
        
        console.log("delete trip "+id)
    }
    fetchTrips = async()=>{
        const data = await fetchTrips()
        this.setState({data:data},()=>{
            this.setState({refreshing:false})
        })
    }

    async componentDidMount(){
        this.setState({loading:true})
        await this.fetchTrips()
        this.setState({loading:false})
    }

    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
            
            {    
            this.state.loading?
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                    <ProgressBarAndroid/>
                </View>
                :
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
                        this.setState({refreshing:true})
                        this.fetchTrips()
                    }}
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{height:10}} />
                        )
                    }}
                    renderItem={(item)=>{
                        return(
                            <TripCard 
                                trip={item.item}
                                navigateToEditTrip={this.navigateToEditTrip} 
                                deleteTrip = {this.deleteTrip}
                            />
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                /> 
                }
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
  