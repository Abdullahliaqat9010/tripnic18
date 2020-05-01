import React from 'react'
import {Modal,View,ScrollView,Text,StyleSheet,Dimensions,TouchableOpacity,ImageBackground, TextInput} from 'react-native'
const src = 'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_04_hd_pictures_166258.jpg'
const {width} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
import {StyledDatePicker,StyledPicker,StyledTextInput, StyledButton} from '../../../components/styled_components'
import CheckBox from '@react-native-community/checkbox';


class AddTrip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            to:"",
            from:"",
            description:"",
            start_date:"",
            end_date:"",
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
            schedule:{},
            genderOption:[
                "Not specified",
                "Male",
                "Female",
                "Other"
            ],
            toOptions:[
                "lahore",
                "Karachi"
            ],
            fromOptions:[
                "lahore",
                "Karachi"
            ]
        }
    }

    selectTo = (to)=>{
        console.log(to)
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
            
            <Modal visible={this.props.visible} animated animationType="fade" onRequestClose={()=>{this.props.close()}} > 
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:"center",justifyContent:"flex-start"}} >    
                    
                    <ImageBackground style={{width:width,height:200}} source={{uri:src}} >
                        <Icon 
                            style={{paddingLeft:15,paddingTop:15}} 
                            name="ios-close-circle" 
                            size={30} 
                            color="white" 
                            onPress={()=>this.props.close()}
                        />
                    </ImageBackground>

{/*************************************** Title  ******************************************/}

                    <View style={styles.container} >
                        <TextInput style={styles.title} placeholder="Add Title" ></TextInput>
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
                            placeholder="Add Description of Trip" />
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
                        <Text style={styles.heading} >Price</Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledTextInput width={150} placeholder="Price in Rupees" keyboardType="numeric" maxLength={6} />
                    </View>


{/*************************************** Discount  ******************************************/}
                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Discount (%) </Text>
                    </View>
                    <View style={styles.pickers} >
                        <StyledTextInput width={150} placeholder="Discount in %" keyboardType="numeric" maxLength={2} />
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
                            placeholder="Add Accomodation Details; hotel name etc" />
                    </View>


{/*************************************** Conveyance  ******************************************/}


                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Conveyance </Text>
                    </View>
                    <View style={styles.accomodationBox} >
                        <TextInput style={styles.inputMultiline}
                            maxLength={500}
                            multiline 
                            placeholder="Add Conveyance Details" />
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
                            placeholder="Add Pickup Details" />
                    </View>



{/*************************************** Schedule  ******************************************/}

                    <View style={styles.headingContainer} >
                        <Text style={styles.heading} >Schedule </Text>
                    </View>
                    <View style={styles.pickers} >
                        <TouchableOpacity style={{
                                borderWidth:1,
                                width:135,
                                height:50,
                                alignItems:"center",
                                justifyContent:"center",
                                borderRadius:10,
                                borderColor:"#A7A5A5"
                            }}>
                            <Text style={{fontSize:15,color:"#A7A5A5"}} >Add Schedule</Text>
                        </TouchableOpacity>
                    </View>



{/*************************************** Add trip ******************************************/}

                   <View style={{paddingVertical:100}} >
                        <StyledButton 
                            title="Add Trip" 
                            roundEdged
                            fontSize={20}
                            height={50}
                            width={150}
                            onPress={()=>{
                                console.log(this.state)
                            }}
                            />
                   </View>

                </ScrollView>
            </Modal>
        )

    }
} 



export default AddTrip

const styles = StyleSheet.create({
    title:{
        fontSize:35,
        fontWeight:"bold",
        paddingHorizontal:10,
        flex:1,
    },
    heading:{
        fontSize:20,
        fontWeight:"bold",
    },
    container:{
        width:width,
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:5,
        paddingHorizontal:10,
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
        fontSize:18,
        color:"grey"
    },
    checkBox:{
        width:width,
        alignItems:"flex-start",
        paddingLeft:20,
        paddingTop:10
    }
})