import React from 'react'
import {View,Text,Image} from 'react-native'
import {Toast,StyledButton} from '../../../components/styled_components'
import {acceptRequest,declineRequest,fetchTravellerProfile} from '../../../redux/actions/app_actions'
import Loading from '../../common/loading'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default class Request extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoadingOnStart:false,
            isAcceptLoading:false,
            isDeclineLoading:false,
            toggleToast:false,
            msg:"",
            traveller:{},
            notification:props.route.params?.notification,
            imageUri:null

        }
    }
    componentDidMount(){
        this.setState({isLoadingOnStart:true})
        this.fetchTravellerProfile()
    }

    fetchTravellerProfile = async()=>{
        try {
            const profile = await fetchTravellerProfile(this.state.notification.traveller_id)
            if(profile.profilePicture !== null){
                this.setState({imageUri:profile.profilePicture})
            }
            console.log(profile)
            this.setState({traveller:{...profile},isLoadingOnStart:false})
        } catch (error) {
            this.setState({isLoadingOnStart:false})
            this.setState({msg:error})
            this.setState({toggleToast:true},()=>{
                this.setState({toggleToast:false})
            })
        }
    }

    accept= async ()=>{
        try {
            this.setState({isAcceptLoading:true})
            await acceptRequest(this.state.notification.traveller_id,this.state.notification.trip_id,this.state.notification.id)
            this.setState({isAcceptLoading:false})
            this.setState({msg:"successfully accepted the Request"},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
            this.props.navigation.goBack()
        } catch (error) {
            this.setState({msg:error},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        }
    }
    decline = async ()=>{
        try {
            this.setState({isDeclineLoading:true})
            await declineRequest(this.state.notification.traveller_id,this.state.notification.trip_id,this.state.notification.id)
            this.setState({isDeclineLoading:false})
            this.setState({msg:"You have declined the Request"},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
            this.props.navigation.goBack()
        } catch (error) {
            this.setState({msg:error},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        }
    }

    render(){
        if(this.state.isLoadingOnStart){
            return(
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                    <ProgressBarAndroid/>
                </View>
            )
        }
        else
        return(  
        <View style={{flex:1}} >     
            <View style={{backgroundColor:"white",flex:2,justifyContent:"flex-start",alignItems:"flex-start",padding:20}} >  
                <Image style={{width:150,height:150,borderWidth:1,borderRadius:20}}
                    source={this.state.imageUri?{uri:this.state.imageUri}:require('../../../assets/profile-placeholder.png')}
                />
                <View style={{paddingVertical:20}} >
                    <View style={{flexDirection:"row",alignItems:"center",paddingBottom:10}} >
                        <Icon name="ios-person" size={30} />
                        <Text 
                            style={{
                                paddingLeft:20,
                                fontSize:20
                            }} 
                        >
                        {this.state.traveller.name}
                        </Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",paddingBottom:10}} >
                        <MaterialIcon name="email" size={24} />
                        <Text 
                            style={{
                                paddingLeft:20,
                                fontSize:15
                            }} 
                        >
                        {this.state.traveller.email}
                        </Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",paddingBottom:10,paddingLeft:5}} >
                        <Icon name="ios-phone-portrait" size={30} />
                        <Text 
                            style={{
                                paddingLeft:20,
                                fontSize:15
                            }} 
                        >
                        {this.state.traveller.phone}
                        </Text>
                    </View>

                    <View style={{flexDirection:"row",alignItems:"center",paddingBottom:10,marginLeft:-3}} >
                        <EntypoIcon name="location-pin" size={30} />
                        <Text 
                            style={{
                                paddingLeft:10,
                                fontSize:15
                            }} 
                        >
                        {this.state.traveller.city+', Pakistan'}
                        </Text>
                    </View>
                    
                </View>
               
                <Toast visible={this.state.toggleToast} message={this.state.msg} />
                <Loading visible={this.state.isAcceptLoading || this.state.isDeclineLoading} />
            </View>
            <View style={{flex:1,flexDirection:"row",alignItems:"flex-start",justifyContent:"center",backgroundColor:"white"}} >
                <View style={{paddingRight:10}} >
                    <StyledButton roundEdged fontSize={20} loading={this.state.isAcceptLoading} onPress={this.accept} title="Accept" />
                </View>
                <View style={{paddingLeft:10}} >
                    <StyledButton roundEdged fontSize={20} loading={this.state.isDeclineLoading} onPress={this.decline} title="Decline" />
                </View>
            </View>
        </View>  
        )
    }
}