import React from 'react'
import {View,Text,TouchableOpacity,Image, Dimensions,FlatList,StyleSheet,Alert} from 'react-native'
import { store } from '../../../redux/store'
import { signout } from '../../../redux/actions/auth_actions'
import {FAB} from 'react-native-paper'
import {Toast} from '../../../components/styled_components'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchTrips,deleteTrip} from '../../../redux/actions/app_actions'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
const {width} = Dimensions.get("window")



const TripCard = ({trip,navigateToEditTrip,deleteTrip,navigateToPreviewTrip})=>{
    return(
        <TouchableOpacity 
            onPress={()=>{
                navigateToPreviewTrip(trip.id)
            }}
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
                ],{ cancelable: true })
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
                    defaultSource={require('../../../assets/placeholder.png')}
                />
           
            <View style={{flex:3,paddingHorizontal:10,justifyContent:"center"}} >
                <Text style={{fontSize:17,fontWeight:"bold",marginBottom:10}} >{trip.title}</Text>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="ios-timer" size={15} />
                    <Text style={{marginLeft:5}} >{trip.duration+' days'}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="md-person" size={15} />
                    <Text style={{marginLeft:5}} >{trip.capacity+' persons'}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}} >
                    <Icon name="ios-pricetag" size={15} />
                    <Text style={{marginLeft:5}} >{'Rs '+trip.price}</Text>
                </View>
                {   trip.discount > 0 &&
                    <View style={{flexDirection:"row",borderRadius:5,alignItems:"center",justifyContent:"center",marginBottom:5,backgroundColor:"#2F9AE3"}} >
                        <Icon name="md-flame" size={15} color="white" />
                        <Text style={{marginLeft:5,color:"white"}} >{trip.discount+'% off'}</Text>
                    </View>
                }
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
           data:[]
        }
    }

    navigateToEditTrip = (id)=>{
        this.props.navigation.navigate("Edit Trip",{id:id})
    }
    navigateToPreviewTrip = (id)=>{
        this.props.navigation.navigate("Preview",{id:id})
    }
    deleteTrip = async (id)=>{
        try {
            await deleteTrip(id)
            this.fetchTrips()
            this.setState({msg:"Successfully deleted"},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        } catch (error) {
            this.setState({msg:error},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        }
    
    }
    fetchTrips = async()=>{
        try {
            const data = await fetchTrips()
            this.setState({data:data},()=>{
                this.setState({refreshing:false})
            })
        } catch (error) {
            this.setState({refreshing:false})
            this.setState({msg:error},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        }
    }
    _unsubscribe = null

    async componentDidMount(){
        
        this._unsubscribe = this.props.navigation.addListener('focus', async() => {
            this.setState({loading:true})
            await this.fetchTrips()
            this.setState({loading:false})
        });
        
        this.setState({loading:true})
        await this.fetchTrips()
        this.setState({loading:false})
    }

    componentWillUnmount() {
        this._unsubscribe();
      }

    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
            
            {    
            this.state.loading?
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                    <ProgressBarAndroid color="#2F9AE3" />
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
                    // onEndReached={()=>{
                    //     //console.log("end reached")
                    // }}
                    ListFooterComponent={()=>{
                        return(
                            <View style={{height:100}} />
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
                                navigateToPreviewTrip = {this.navigateToPreviewTrip}
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
            <Toast message={this.state.msg} visible={this.state.toggleToast} />
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
  