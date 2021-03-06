import React from 'react'
import {View,Text, FlatList,Dimensions,Alert, TouchableOpacity} from 'react-native'
import {fetchNotifications,deleteNotification} from '../../../redux/actions/app_actions'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import {Toast} from '../../../components/styled_components'
const {width} = Dimensions.get('window')

const NotificationCard = ({notification,deleteNotification})=>{
    const fetchTime = (time)=>{
        const rightNow = new Date().getTime()
        const date = new Date(parseInt(time)).getTime()
        let difference = rightNow-date
        difference = difference/(1000)
        if(difference < 59){
            return difference > 1 ? Math.floor(difference).toString()+' seconds ago':
                                    Math.floor(difference).toString()+' second ago'
        }
        difference = difference/60
        if(difference < 59){
            return difference > 1 ? Math.floor(difference).toString()+' minutes ago':
                                    Math.floor(difference).toString()+' minute ago'
        }
        difference = difference/60
        if(difference < 23){
            return difference > 1 ? Math.floor(difference).toString()+' hours ago':
                                    Math.floor(difference).toString()+' hour ago'
        }
        difference = difference/24
        return difference > 1 ? Math.floor(difference).toString()+' days ago':
                                    Math.floor(difference).toString()+' day ago'
    }
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={()=>{
                
                    Alert.alert('','Delete this notification',[
                        {
                            text:"Yes",
                            onPress:()=>{
                                deleteNotification(notification.id)
                            }
                        },
                        {
                            text:"No"
                        }
                    ]
                    ,{cancelable:true})
                
            }}
        >
            <View style={{
            width:width,
            height:80,
            justifyContent:"flex-start",
            flexDirection:"row",
            alignItems:"center",
            backgroundColor:"white"
            }} >
                <View style={{width:80,height:80,justifyContent:"center",alignItems:"center"}} >
                    <View style={{width:60,height:60,backgroundColor:"#2BB396",borderRadius:30,alignItems:"center",justifyContent:"center"}} >
                        <Text style={{color:"white",fontWeight:"bold"}} >Tripnic</Text>
                    </View>
                </View>
                <View>
                    <Text style={{fontSize:16,fontWeight:"bold"}} >{notification.title}</Text>
                    <Text style={{fontSize:14}} >{notification.accepted?"Your Request has been accepted":"The organizer declined your request"}</Text>
                    <Text style={{fontSize:11}} >{fetchTime(notification.timestamp)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default class NotificationMain extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            notifications : [],
            isRefreshing:false,
            isLoading:false,
            msg:"",
            toggleToast:false
        }
    }
    
    fetchNotifications = async()=>{
        try {
           const notifications = await fetchNotifications()
           this.setState({notifications:notifications})
           this.setState({isRefreshing:false})
           this.setState({isLoading:false})
           //console.log(notifications)
        } catch (error) {
            this.setState({isLoading:false})
            this.setState({msg:error})
            this.setState({toggleToast:error},()=>{
             this.setState({toggleToast:false})
            })
        }
    }
    componentDidMount(){
        this.setState({isLoading:true})
        this.fetchNotifications()
    }
    refresh = ()=>{
        this.setState({isRefreshing:true})
        this.fetchNotifications()
    }

    deleteNotification = async(id)=>{
        try {
           await deleteNotification(id)
           this.setState({msg:"Successfully removed notification from your list"})
           this.fetchNotifications()
           this.setState({toggleToast:true},()=>{
            this.setState({toggleToast:false})
           })
        } catch (error) {
            this.setState({msg:error})
            this.setState({toggleToast:error},()=>{
             this.setState({toggleToast:false})
            })
        }
    }

    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
                
                {
                this.state.isLoading?
                <ProgressBarAndroid/>:
                <FlatList
                    style={{flex:1}}
                    onRefresh={this.refresh}
                    refreshing={this.state.isRefreshing}
                    ListHeaderComponent={()=>{
                        return(
                            <View style={{
                                    width:width,
                                    height:30,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor:"#F5F5F5",
                                    
                                    }} >
                                <Text style={{fontSize:12,color:'grey'}} >{this.state.notifications.length>0?"Tap and hold for more options":"No Notification"}</Text>
                            </View>
                        )
                    }}
                    data={this.state.notifications}
                    
                    renderItem={({item})=>{
                        return(
                            <NotificationCard navigation={this.props.navigation} deleteNotification={this.deleteNotification} notification={item} />
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                />}
                   
            <Toast visible={this.state.toggleToast} message={this.state.msg} />    
            </View>
        )
    }
}