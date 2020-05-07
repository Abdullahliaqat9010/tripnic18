import React from 'react'
import {Modal,View,Text,Dimensions} from 'react-native'
import {StyledButton} from '../../../components/styled_components'
const {width} = Dimensions.get('window')

const Edit = ({edit_index,visible,closeModal})=>{
    return(
        <Modal visible={visible} >
            <View style={{flex:1,alignItems:"center",justifyContent:"flex-start"}} >
                <View  >

                </View>
                <Text>Edit Profile</Text>
                <StyledButton onPress={()=>closeModal()} roundEdged title="update" />
            </View>
        </Modal>
    )
}

export default Edit