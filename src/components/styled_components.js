import React,{useState} from 'react'
import {ToastAndroid,TouchableOpacity,TextInput,Text, View,Button} from 'react-native'
import {ProgressBarAndroid} from '@react-native-community/progress-bar-android'
import {store} from '../redux/store'
import  Icon  from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-community/picker'
import DateTimePicker from '@react-native-community/datetimepicker'



const formatDate = (_date)=>{
    const day = _date.getDate()
    const month = _date.getMonth()
    const year = _date.getFullYear()
    const formatedDate = `${day}/${month}/${year}`
    return formatedDate
}

const StyledDatePicker = ({onChangeDate,defaultDate})=>{
    const [date, setDate] = useState(defaultDate?new Date(defaultDate):new Date());
    const [readableDate,setReadableDate] = useState(formatDate(date))
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        //console.log(selectedDate)
        setShow(false)
        if(selectedDate !== undefined){
            setDate(selectedDate)
            setReadableDate(formatDate(selectedDate))
            onChangeDate?onChangeDate(selectedDate):{}
        }
    };
    const showDatepicker = ()=>{
        //console.log(show)
        setShow(true)
    }

    React.useEffect(()=>{
        if(defaultDate){
            setDate(defaultDate)
        }
    },[defaultDate])
  return(
    <View>
    <View>
      <TouchableOpacity style={{
          borderWidth:1,
          width:135,
          height:40,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:10,
          borderColor:"#A7A5A5"
      }} onPress={showDatepicker} >
          <Text style={{fontSize:15,color:"#A7A5A5"}} >{readableDate}</Text>
      </TouchableOpacity>
    </View>
    {show && (
      <DateTimePicker
        value={date}
        mode='date'
        display="default"
        onChange={onChange}
        minimumDate={new Date()}
      />
    )}
  </View>
  )

}


const organizerTheme = {
    primary:"#2F9AE3"
}

const travellerTheme = {
    primary:"#2BB396"
}

const globalDimensions = {
    width:135,
    height:50
}

const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        200
      );
      return null;
    }
    return null;
};

const StyledButton = ({roundEdged,rounded,flat,width,fontSize,height,backgroundColor,textColor,LeftIcon,title,onPress,loading})=>{
    const [isOrganizer,setRole] = React.useState(null)
    React.useEffect(()=>{
        const state = store.getState()
        setRole(state.authReducer.isOrganizer)
    },[])
    return(
        <TouchableOpacity style={{
            width:width===undefined?135:width,
            height:height===undefined?40:height,
            backgroundColor: backgroundColor === undefined?
                                (isOrganizer === null?"grey":(isOrganizer?organizerTheme.primary:travellerTheme.primary)):
                                backgroundColor
                                ,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:rounded === undefined?(roundEdged === undefined?0:(height === undefined?globalDimensions.height/4:height/4)):(height === undefined?globalDimensions.height/2:height/2),
            elevation:flat === undefined?5:0,

        }}
            onPress={()=> onPress?onPress():{}}
            disabled = {loading}
            activeOpacity={0.9}
        >
            {
                LeftIcon &&
                <View style={{alignItems:"center",justifyContent:"center",paddingLeft:10}} >
                    <LeftIcon />
                </View>
            }
            {
                loading===undefined?
                <View style={{flex:3,justifyContent:"center",alignItems:"center",}}>
                    <Text style={{
                        color:textColor===undefined?"white":textColor,
                        fontSize:fontSize
                    }} >
                        {title}
                    </Text>
                </View>:
                (
                    loading?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >  
                        <ProgressBarAndroid color="white" style={{height:height===undefined?globalDimensions.height/1.5:height/1.5}} />
                    </View>:
                    <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{
                            color:textColor===undefined?"white":textColor,
                            fontSize:fontSize
                        }} >
                            {title}
                        </Text>
                    </View>

                )
            }
        </TouchableOpacity>
    )
}


const StyledTextInput = ({width,height,password,isValid,placeholder,onChangeText,keyboardType,maxLength,fontSize,defaultValue})=>{
    
    const [showPassword,setPasswordVisibility] = React.useState(!password) 

    return(
        <View style={{
            width:width,
            height:height,
            borderWidth:1,
            borderRadius:10,
            borderColor:isValid===undefined?"#A7A5A5":(isValid?"#A7A5A5":"red"),
            paddingLeft:10,
            flexDirection:"row",
            alignItems:"center"
        }} >
            <TextInput 
                defaultValue={defaultValue}
                maxLength={maxLength?maxLength:100}
                keyboardType={keyboardType?keyboardType:"default"}
                secureTextEntry={!showPassword} 
                style={{
                    fontSize:fontSize?fontSize:16,
                    color:"black",
                    flex:1
                }} 
                onChangeText={(text)=>onChangeText?onChangeText(text):{}}
                placeholder={placeholder} 
            />
           {
               password &&
                <Icon onPress={()=>{setPasswordVisibility(!showPassword)}}
                    name={!showPassword?"ios-eye":"ios-eye-off"} 
                    size={20}
                    style={{paddingRight:15}}
                    color={isValid===undefined?"black":isValid?"black":"red"} 
                />
           }
      </View>
    )
}

const OTPInput = ({onChangeText})=>{
    
    return(
        <View style={{
            width:150,
            height:50,
            borderWidth:1,
            borderRadius:10,
            flexDirection:"row",
            alignItems:"center"
        }} >
            <TextInput 
                
                style={{
                    fontSize:22,
                    color:"black",
                    flex:1,
                    textAlign:"center",
                    
                }} 
                maxLength={6} 
                onChangeText={(text)=>onChangeText?
                    onChangeText(text):{}}
                placeholder="6 Digit OTP" 
            />
      </View>
    )
}

const CustomePicker = (props)=>{
    const [selectedValue,setSelectedValue] = React.useState(props.defaultValue?props.defaultValue:"Not Specified")
    React.useEffect(()=>{
        if(props.defaultValue){
            setSelectedValue(props.defaultValue)
        }
    },[props.defaultValue])
    return(
      <Picker
          mode="modal"
          selectedValue={selectedValue}
          style={{ height: 50, width: 160 }}
          onValueChange={(itemValue, itemIndex) => {
            props.select?props.select(itemValue):{}
            setSelectedValue(itemValue)
          }}
          
        >
          {props.options.map((item,index)=>(
            <Picker.Item label={item} value={item} key={index} />
          ))}
          
        </Picker>
    )
  }

const StyledPicker = ({width,options,select,title,defaultValue})=>{
    return(
        <View style={{
            width:width,
            height:50,
            flexDirection:"row",
            borderWidth:1,
            borderRadius:10,
            borderColor:"#A7A5A5",
            justifyContent:"flex-start",
            paddingLeft:20
        }} >
            <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                
                <Text style={{
                                fontSize:16,
                                color:"black",
                                fontWeight:"bold"
                }} >{title}</Text>
            </View>
            <View style={{flex:1,alignItems:"flex-end"}} >
                <CustomePicker options={options} select={select} defaultValue={defaultValue} />
            </View>
        </View>
    )
}  

export {Toast,StyledButton,StyledTextInput,StyledPicker,OTPInput,StyledDatePicker}