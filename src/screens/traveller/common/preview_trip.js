import React from 'react'
import {View,ScrollView,Text,StyleSheet,Dimensions,TouchableOpacity,Image,ImageBackground} from 'react-native'
import {StyledDatePicker,StyledButton,Toast} from '../../../components/styled_components'
import CheckBox from '@react-native-community/checkbox';
import {fetchTripDetials,addTripRequest,isRequested,isTripLiked,likeTrip,unlikeTrip,cancelTripRequest} from '../../../redux/actions/app_actions'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import Loading from '../../common/loading'
import Icon  from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window')

class PreviewTrip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isRequestedTrip:false,
            isLiked:false,
            id:props.route.params?.id,
            capacity:0,
            title:"",
            to:"",
            msg:"",
            toggleToast:"",
            isLoading:false,
            thumbnail:"https://sweettutos.com/wp-content/uploads/2015/12/placeholder.png",
            from:"",
            description:"",
            start_date:null,
            end_date:null,
            price:0,
            discount:0,
            food:{
                breakfast:false,
                lunch:false,
                dinner:false
            },
            gender:"Not specified",
            pickup:"",
            accomodation:"",
            conveyance:"",
            schedule:"",
        }
    }

    
    async componentDidMount(){
        this.setState({isFetchingDetails:true})
        this.fetchDetails()
    }

    fetchDetails = async()=>{
        try {
            const trip = await fetchTripDetials(this.props.route.params?.id)
            const isRequestedTrip = await isRequested(this.state.id)
            const isLiked = await isTripLiked(this.state.id)
            this.setState({
                isRequestedTrip:isRequestedTrip,
                isLiked:isLiked,
                title:trip.title,
                to:trip.to,
                from:trip.from,
                description:trip.description,
                start_date:trip.start_date,
                end_date:trip.end_date,
                price:trip.price,
                capacity:trip.capacity,
                discount:trip.discount,
                food:{...trip.food},
                accomodation:trip.accomodation,
                conveyance:trip.conveyance,
                gender:trip.gender,
                pickup:trip.pickup,
                thumbnail:trip.thumbnail,
                schedule:trip.schedule
            },()=>{
                this.setState({isFetchingDetails:false})
            })
            
        } catch (error) {
            this.setState({isFetchingDetails:false})
            this.setState({msg:error},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
            })
        }
    }

    addRequest = async()=>{
        try {
            this.setState({isLoading:true})
            await addTripRequest(this.state.id)
            this.setState({isLoading:false})
            this.setState({isRequestedTrip:true})
            this.setState({msg:"Successfully Requested the trip."},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
              })
        } catch (error) {
            this.setState({isLoading:false})
            this.setState({msg:error},()=>{
              this.setState({toggleToast:true},()=>{
                this.setState({toggleToast:false})
              })
            })
        }
    }

    cancelRequest = async()=>{
        try {
            this.setState({isLoading:true})
            await cancelTripRequest(this.state.id)
            this.setState({isLoading:false})
            this.setState({isRequestedTrip:false})
            this.setState({msg:"Your request has been removed."},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
              })
        } catch (error) {
            this.setState({isLoading:false})
            this.setState({msg:error},()=>{
              this.setState({toggleToast:true},()=>{
                this.setState({toggleToast:false})
              })
            })
        }
    }

    likeTrip = async()=>{
        try {
            await likeTrip(this.state.id)
            this.setState({msg:"Added to your likes",isLiked:true},()=>{
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

    unlikeTrip = async()=>{
        try {
            await unlikeTrip(this.state.id)
            this.setState({msg:"Successfully removed from your likes",isLiked:false},()=>{
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

    render(){
        if(this.state.isFetchingDetails){
            return(
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                    <ProgressBarAndroid color="#2BB598" />
                </View>
            )
        }
        else
        return(             
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor:"white",alignItems:"center",justifyContent:"flex-start"}} >    
                    
                    <TouchableOpacity
                        disabled
                        onPress={this.selectImage}
                        activeOpacity={0.9}
                    >
                        {/* <Image style={{width:width,height:250}} source={{uri:this.state.thumbnail}} 
                        /> */}
                        <ImageBackground 
                            style={{width:width,height:250}} 
                            source={{uri:this.state.thumbnail}} 
                        >
                        <View style={{flex:1,justifyContent:"flex-end",alignItems:"flex-start",margin:20}} >
                            <View style={{borderRadius:5,width:45,height:45,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.7)"}} >
                                <Icon 
                                    name="ios-heart" 
                                    size={35} 
                                    color={this.state.isLiked?"red":"white"} 
                                    onPress={this.state.isLiked?this.unlikeTrip:this.likeTrip}
                                />
                            </View>
                        </View>
                        </ImageBackground>
                            
                        
                    </TouchableOpacity>


                    <View style={styles.container} >
                        <Text style={styles.title} >{`${this.state.title}`}</Text>
                    </View>



                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",width:width}} >
                        <Text style={{fontSize:25,fontWeight:"bold",paddingHorizontal:20}} >To</Text>
                        <Text style={{color:"grey",fontSize:20}} >{this.state.to}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",width:width}} >
                        <Text style={{fontSize:25,fontWeight:"bold",paddingHorizontal:20}} >From</Text>
                        <Text style={{fontSize:20,color:"grey"}} >{this.state.from}</Text>
                    </View>



                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Description</Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.description}</Text>
                    </View>



                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Start Date - End Date</Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledDatePicker disabled defaultDate={new Date(parseInt(this.state.start_date))}/>
                        <Text style={{paddingHorizontal:17}} >-</Text>
                        <StyledDatePicker disabled defaultDate={new Date(parseInt(this.state.end_date))}/>
                    </View>



                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Price (per person)</Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{"Rs "+this.state.price}</Text>
                    </View>



                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Capacity</Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.capacity+" persons"}</Text>
                    </View>



                {
                    this.state.discount > 0 &&
                    <>
                    <View style={styles.headingContainer} >
                    <Text style={styles.heading} >Discount (%) </Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.discount+" % off"}</Text>
                    </View>
                    </>
                }



                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Food </Text>
                    </View>
                    <View style={styles.checkBox} >
                        <View style={{flexDirection:"row",alignItems:"center"}} >
                            <CheckBox 
                                value={this.state.food.breakfast} 
                                disabled 
                            />
                            <Text style={styles.text} >Breakfast</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}} >
                            <CheckBox value={this.state.food.lunch} 
                                 disabled
                            />
                            <Text style={styles.text} >Lunch</Text>
                        </View>
                        <View style={{flexDirection:"row" ,alignItems:"center"}} >
                            <CheckBox value={this.state.food.dinner} 
                               disabled
                            />
                            <Text style={styles.text} >Dinner</Text>
                        </View>
                    </View>


                    {
                        this.state.accomodation  !== "" &&
                        <>
                        <View style={styles.headingContainer} >
                            <Text style={styles.heading} >Accomodation </Text>
                        </View>
                        <View style={{width:width,paddingHorizontal:20}} >
                            <Text style={{fontSize:17,color:"grey"}} >{this.state.accomodation}</Text>
                        </View>
                        </>
                    }



                    {
                        this.state.conveyance !== "" &&
                        <>
                        <View style={styles.headingContainer} >
                            <Text style={styles.heading} >Conveyance </Text>
                        </View>
                        <View style={{width:width,paddingHorizontal:20}} >
                            <Text style={{fontSize:17,color:"grey"}} >{this.state.conveyance}</Text>
                        </View>
                        </>
                    }


                    {
                    this.state.gender !== "Not specified" &&
                    <>
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Gender Specification </Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.gender}</Text>
                    </View>
                    </>
                    }

                    {this.state.pickup!==""&&
                    <>
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Pickup point </Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.pickup}</Text>
                    </View>
                    </>
                    }

                    {this.state.schedule!==""&&
                    <>
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Trip Schedule </Text>
                    </View>
                    <View style={{width:width,paddingHorizontal:20}} >
                        <Text style={{fontSize:17,color:"grey"}} >{this.state.schedule}</Text>
                    </View>
                    </>
                    }

                    
                    <View style={{height:160,justifyContent:"center"}} >
                        {
                            this.state.isRequestedTrip?
                            <StyledButton 
                            onPress={this.cancelRequest}
                            loading={this.state.isLoading} 
                            width={160} 
                            fontSize={20} 
                            title="Cancel Request" 
                            roundEdged 
                            />:
                            <StyledButton 
                            onPress={this.addRequest}
                            loading={this.state.isLoading} 
                            width={150} 
                            fontSize={20} 
                            title="Add Request" 
                            roundEdged 
                            />
                        }
                    </View>
                    <Toast message={this.state.msg} visible={this.state.toggleToast} />
                    <Loading visible={this.state.isLoading} />
                </ScrollView>

        )

    }
} 

export default PreviewTrip

const styles = StyleSheet.create({
    title:{
        fontSize:35,
        fontWeight:"bold",
        paddingHorizontal:20,
        width:width,
        paddingVertical:10

    },
    heading:{
        fontSize:25,
        fontWeight:"bold",
    },
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:5,
        alignItems:"center",
        
    },
    pickers:{
        width:width,
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:5,
        paddingHorizontal:20,
        alignItems:"center",
    },
    inputMultiline:{
       fontSize:15
    },
    descriptionBox:{
        flex:1,
        height:200,
        borderColor:"#A7A5A5",
        width:width-50,
        borderWidth:1,
        alignItems:"flex-start",
        marginVertical:5,
        borderRadius:10,
        marginRight:10,
        paddingLeft:10
    },
    accomodationBox:{
        flex:1,
        height:100,
        borderColor:"#A7A5A5",
        width:width-50,
        borderWidth:1,
        alignItems:"flex-start",
        marginVertical:5,
        borderRadius:10,
        marginRight:10,
        paddingLeft:10
    },
    headingContainer:{
        flex:1,
        width:width,
        paddingLeft:20,
        paddingTop:20,
        alignItems:"flex-start",
        justifyContent:"center"
    },
    text:{
        fontSize:15,
        color:"black"
    },
    checkBox:{
        width:width,
        alignItems:"flex-start",
        paddingLeft:20,
        paddingTop:10
    }
})