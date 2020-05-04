import React from 'react'
import {View,Text,Modal,Button} from 'react-native'


const AddSchedule = ({visible,addSchedule,closeScheduleModal})=>{
    const closeModal = ()=>{
        closeScheduleModal()
    }
    return(
        <Modal visible={visible} >
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                <Text>Add Schedule</Text>
                <Button title="close" onPress={closeModal} />
            </View>
        </Modal>
    )
}

export default AddSchedule