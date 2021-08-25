import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AccountsModal from './AccountsModal'
import Avatar from './Avatar'

const UserAvatar = () => {
    const [modalVisible, setmodalVisible] = useState(false)
    const toggleModal = () => {
            setmodalVisible(!modalVisible)
        }
        
    return (
        <View>
            {modalVisible &&  <AccountsModal close={toggleModal} />}
            <TouchableOpacity onPress = {toggleModal} >
                <Avatar size={30} />
            </TouchableOpacity>
        </View>
    )
}

export default UserAvatar

const styles = StyleSheet.create({})
