import React from 'react'
import {View,Text} from 'react-native'
import {StyledButton,StyledTextInput, StyledPicker,Toast} from '../../../components/styled_components'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const Edit = ({navigation,route})=>{
    
    const [profile] = React.useState(route.params?.profile)
    const [name,setName] = React.useState(route.params?.profile.name)
    const [city,setCity] = React.useState(route.params?.profile.city)
    const [gender,setGender] = React.useState(route.params?.profile.gender)
    const [isUpdatingName,setIsUpdatingName] = React.useState(false)
    const [isUpdatingCity,setIsUpdatingCity] = React.useState(false)
    const [isUpdatingGender,setIsUpdatingGender] = React.useState(false)
    const [msg,setMsg] = React.useState("")
    const [toggleToast,setToggleToast] = React.useState(false)
    const [genderOption] = React.useState([
        "Male",
        "Female",
        "Other",
    ])
    const [cityOptions] = React.useState([
        "Lahore",
        "Karachi",
        "Islamabad",
    ])

    const updateName = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            try {
                unsubscribe()
                setIsUpdatingName(true)
                await firestore().collection('organizers').doc(user.uid).update({
                    name:name
                })
                setIsUpdatingName(false)
                setMsg("Successfully updated Name")
                setToggleToast(true)
                
            } catch (error) {
                unsubscribe()
                setIsUpdatingName(false)
                setMsg(error.message)
                setToggleToast(true)
            }
        })
    }
    const updateGender = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            try {
                unsubscribe()
                setIsUpdatingGender(true)
                await firestore().collection('organizers').doc(user.uid).update({
                    gender:gender
                })
                setIsUpdatingGender(false)
                setMsg("Successfully updated Gender")
                setToggleToast(true)
                
            } catch (error) {
                unsubscribe()
                setIsUpdatingGender(false)
                setMsg(error.message)
                setToggleToast(true)
            }
        })
    }
    const updateCity = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            try {
                unsubscribe()
                setIsUpdatingCity(true)
                await firestore().collection('organizers').doc(user.uid).update({
                    city:city
                })
                setIsUpdatingCity(false)
                setMsg("Successfully updated City")
                setToggleToast(true)
                
            } catch (error) {
                unsubscribe()
                setIsUpdatingCity(false)
                setMsg(error.message)
                setToggleToast(true)
            }
        })
    }

    React.useEffect(()=>{
        if(toggleToast){
            setToggleToast(false)
        }
    },[toggleToast])
    
    return(
        <View style={{flex:1,backgroundColor:"white",justifyContent:"flex-start",alignItems:"flex-start",padding:20}} >
            <Text style={{fontSize:20,fontWeight:"bold"}} >Display Name</Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingVertical:10}} >
                <StyledTextInput onChangeText={(n)=>setName(n)} placeholder="Update Name" defaultValue={profile.name} fontSize={15} width={200} height={40} />
                <View style={{flex:1,alignItems:"flex-end",paddingLeft:20}}>
                    <StyledButton onPress={updateName} loading={isUpdatingName} title="Update" roundEdged fontSize={15} height={40} width={100} />
                </View>
            </View>
            <Text style={{fontSize:20,fontWeight:"bold",paddingTop:10}} >Gender</Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingVertical:10}} >
                <StyledPicker select={(g)=>setGender(g)} options={genderOption} defaultValue={profile.gender} width={200} height={40} />
                <View style={{flex:1,alignItems:"flex-end",paddingLeft:20}}>
                    <StyledButton onPress={updateGender} loading={isUpdatingGender} title="Update" roundEdged fontSize={15} height={40} width={100} />
                </View>
            </View>

            <Text style={{fontSize:20,fontWeight:"bold",paddingTop:10}} >City</Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingVertical:10}} >
                <StyledPicker select={(c)=>setCity(c)} options={cityOptions} defaultValue={profile.city} width={200} height={40} />
                <View style={{flex:1,alignItems:"flex-end",paddingLeft:20}}>
                    <StyledButton onPress={updateCity} loading={isUpdatingCity} title="Update" roundEdged fontSize={15} height={40} width={100} />
                </View>
            </View>
            <Toast visible={toggleToast} message={msg} />
        </View> 
    )
}

export default Edit