import React from 'react'
import {View,ScrollView,Text,StyleSheet,Dimensions,TouchableOpacity,Image, TextInput} from 'react-native'
import {StyledDatePicker,StyledPicker,StyledTextInput, StyledButton,Toast} from '../../../components/styled_components'
import CheckBox from '@react-native-community/checkbox';
import {addNewTrip} from '../../../redux/actions/app_actions'
import ImagePicker from 'react-native-image-picker'
import Loading from '../../common/loading'
import {validateTripInfo} from '../../../components/validations'

const {width} = Dimensions.get('window')

class AddTrip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading:false,
            toggleToast:false,
            msg:"",
            src:"",
            path:"",
            filename:"",
            capacity:0,
            title:"",
            to:"",
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
            genderOption:[
                "Not specified",
                "Male",
                "Female",
            ],
            toOptions:[
                "Not specified",
                "lahore",
                "Karachi"
            ],
            fromOptions:[
                "Not specified",
                "lahore",
                "Karachi"
            ]
        }
    }

    addTrip = async()=>{
        try {
            validateTripInfo(this.state)
            this.setState({isLoading:true})
            await addNewTrip(this.state)
            this.setState({isLoading:false})
            this.setState({msg:"successfully added trip"},()=>{
                this.setState({toggleToast:true},()=>{
                  this.setState({toggleToast:false})
                })
              })
            this.props.navigation.goBack()
        } catch (error) {
            this.setState({isLoading:false})
            this.setState({msg:error},()=>{
              this.setState({toggleToast:true},()=>{
                this.setState({toggleToast:false})
              })
            })
        }
    }

    
    selectImage = ()=>{        
        
        ImagePicker.launchImageLibrary({},async (response) => {
            // Same code as in above section!
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                this.setState({src:response.uri,path:response.path,filename:response.fileName})
              }
        });
    }
    selectTo = (to)=>{
        this.setState({to:to})
    }

    selectFrom = (from)=>{
        this.setState({from:from})
    }

    selectGender = (gender)=>{
        this.setState({gender:gender})
    }

    selectStartDate = (date)=>{
        this.setState({start_date:date.getTime()})
    }

    selectEndDate = (date)=>{
        this.setState({end_date:date.getTime()})
    }

    render(){
        return(
                      
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor:"white",alignItems:"center",justifyContent:"flex-start"}} >    
                    
                    <TouchableOpacity
                        onPress={this.selectImage}
                        activeOpacity={0.9}
                    >
                        <Image style={{width:width,height:250}} source={
                            this.state.src?{uri:this.state.src}:
                            require('../../../assets/image_upload_placeholder.png')
                            } 
                        />
                            
                        
                    </TouchableOpacity>

{/*************************************** Title  ******************************************/}

                    <View style={styles.container} >
                        <TextInput style={styles.title} multiline maxLength={32} placeholder="Add Title" 
                            onChangeText={(title)=>this.setState({title:title})}
                        ></TextInput>
                    </View>


{/*************************************** To and From  ******************************************/}

                    <View style={styles.pickers} >
                        <StyledPicker width={250} title="To" select={this.selectTo} options={this.state.toOptions} />
                    </View>
                    <View style={styles.pickers} >
                        <StyledPicker width={250} title="From" select={this.selectFrom} options={this.state.fromOptions} />
                    </View>


{/*************************************** Description  ******************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Description</Text>
                    </View>
                    <View style={styles.descriptionBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Description of Trip" 
                            onChangeText={(description)=>this.setState({description:description})}
                        />
                    </View>


{/*************************************** Start and End Date  **************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Start Date - End Date</Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledDatePicker onChangeDate={this.selectStartDate} />
                        <Text style={{paddingHorizontal:17}} >-</Text>
                        <StyledDatePicker onChangeDate={this.selectEndDate} />
                    </View>


{/*************************************** Price ******************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Price (per person)</Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledTextInput 
                        width={150} 
                        placeholder="Price in Rupees" 
                        keyboardType="numeric" 
                        maxLength={6} 
                        onChangeText={(price)=>this.setState({price:price})}
                        />
                    </View>


{/*************************************** Capacity ******************************************/}

<View style={styles.headingContainer} >
                        <Text style={styles.heading} >Capacity</Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledTextInput 
                        width={150} 
                        placeholder="Capacity" 
                        keyboardType="numeric" 
                        maxLength={6} 
                        onChangeText={(capacity)=>this.setState({capacity:capacity})}
                        />
                    </View>



{/*************************************** Discount  ******************************************/}
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Discount (%) </Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledTextInput 
                            width={150} 
                            placeholder="Discount in %" 
                            keyboardType="numeric" 
                            maxLength={2} 
                            onChangeText={(discount)=>this.setState({discount:discount})}
                        />
                    </View>


{/*************************************** Food  ******************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Food </Text>
                    </View>
                    <View style={styles.checkBox} >
                        <View style={{flexDirection:"row",alignItems:"center"}} >
                            <CheckBox value={this.state.food.breakfast} 
                                 onValueChange = {(new_val)=>{
                                    this.setState({food:{...this.state.food,breakfast:new_val}})
                                }}
                            />
                            <Text style={styles.text} >Breakfast</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}} >
                            <CheckBox value={this.state.food.lunch} 
                                 onValueChange = {(new_val)=>{
                                    this.setState({food:{...this.state.food,lunch:new_val}})
                                }}
                            />
                            <Text style={styles.text} >Lunch</Text>
                        </View>
                        <View style={{flexDirection:"row" ,alignItems:"center"}} >
                            <CheckBox value={this.state.food.dinner} 
                                onValueChange = {(new_val)=>{
                                    this.setState({food:{...this.state.food,dinner:new_val}})
                                }}
                            />
                            <Text style={styles.text} >Dinner</Text>
                        </View>
                        

{/*************************************** Accomodation  ******************************************/}

                    </View>
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Accomodation </Text>
                    </View>
                    <View style={styles.accomodationBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Accomodation Details; hotel name etc" 
                            onChangeText={(accomodation)=>this.setState({accomodation:accomodation})}
                            />
                    </View>


{/*************************************** Conveyance  ******************************************/}


                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Conveyance </Text>
                    </View>
                    <View style={styles.accomodationBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Conveyance Details" 
                            onChangeText={(conveyance)=>this.setState({conveyance:conveyance})}
                            />
                    </View>



{/*************************************** Gender Spec  ******************************************/}


                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Gender Specification </Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledPicker width={250} title="Gender" select={this.selectGender} options={this.state.genderOption} />
                    </View>



{/*************************************** Pickup Point  ******************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Pickup point </Text>
                    </View>
                    <View style={styles.accomodationBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Pickup Details" 
                            onChangeText={(pickup)=>this.setState({pickup:pickup})}
                            />
                    </View>



{/*************************************** Schedule  ******************************************/}

                <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Schedule</Text>
                    </View>
                    <View style={styles.accomodationBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Trip Schedule" 
                            onChangeText={(schedule)=>this.setState({schedule:schedule})}
                            />
                    </View>



{/*************************************** Add trip ******************************************/}

                   <View style={{paddingVertical:100}} >
                        <StyledButton 
                            loading={this.state.isLoading}
                            title="Add Trip" 
                            roundEdged
                            fontSize={20}
                            height={50}
                            width={150}
                            onPress={this.addTrip}
                            />
                   </View>
                
                <Toast message={this.state.msg} visible={this.state.toggleToast} />
                <Loading visible={this.state.isLoading} />
                </ScrollView>

        )

    }
} 



export default AddTrip

const styles = StyleSheet.create({
    title:{
        fontSize:35,
        fontWeight:"bold",
        paddingHorizontal:20,
        width:width,

    },
    heading:{
        fontSize:20,
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