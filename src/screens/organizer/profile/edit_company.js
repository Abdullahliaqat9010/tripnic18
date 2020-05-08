import React from 'react'
import {View,Text,TextInput} from 'react-native'
import {StyledButton,StyledTextInput,Toast} from '../../../components/styled_components'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const Edit = ({navigation,route})=>{
    
    const [profile] = React.useState(route.params?.profile)
    const [companyName,setCompanyName] = React.useState(route.params?.profile.companyName)
    const [about,setAbout] = React.useState(route.params?.profile.about)
    
    const [isUpdatingName,setIsUpdatingName] = React.useState(false)
    const [isUpdatingAbout,setIsUpdatingAbout] = React.useState(false)
    
    const [msg,setMsg] = React.useState("")
    const [toggleToast,setToggleToast] = React.useState(false)
    

    const updateCompanyName = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            try {
                unsubscribe()
                setIsUpdatingName(true)
                await firestore().collection('organizers').doc(user.uid).update({
                    companyName:companyName
                })
                setIsUpdatingName(false)
                setMsg("Successfully updated Company Name")
                setToggleToast(true)
                
            } catch (error) {
                unsubscribe()
                setIsUpdatingName(false)
                setMsg(error.message)
                setToggleToast(true)
            }
        })
    }

    const updateAbout = ()=>{
        const unsubscribe = auth().onAuthStateChanged(async(user)=>{
            try {
                unsubscribe()
                setIsUpdatingAbout(true)
                await firestore().collection('organizers').doc(user.uid).update({
                    about:about
                })
                setIsUpdatingAbout(false)
                setMsg("Successfully updated Company About")
                setToggleToast(true)
                
            } catch (error) {
                unsubscribe()
                setIsUpdatingAbout(false)
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
            <Text style={{fontSize:20,fontWeight:"bold"}} >Company Name</Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingVertical:10}} >
                <StyledTextInput onChangeText={(n)=>setCompanyName(n)} placeholder="Update Company Name" defaultValue={profile.companyName} fontSize={15} width={200} height={40} />
                <View style={{flex:1,alignItems:"flex-end",paddingLeft:20}}>
                    <StyledButton onPress={updateCompanyName} loading={isUpdatingName} title="Update" roundEdged fontSize={15} height={40} width={100} />
                </View>
            </View>

            <Text style={{fontSize:20,fontWeight:"bold"}} >About Company</Text>
            <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",paddingVertical:10}} >
                <View style={{width:200,height:100,borderWidth:1,borderRadius:10,borderColor:"#A7A5A5"}} >
                <TextInput multiline style={{paddingHorizontal:10}} textAlignVertical="top" onChangeText={(n)=>setAbout(n)} placeholder="Update Name" defaultValue={profile.about} fontSize={15} />
                </View>
                <View style={{flex:1,alignItems:"flex-end",paddingLeft:20}}>
                    <StyledButton onPress={updateAbout} loading={isUpdatingAbout} title="Update" roundEdged fontSize={15} height={40} width={100} />
                </View>
            </View>
        
            <Toast visible={toggleToast} message={msg} />
        </View> 
    )
}

export default Edit