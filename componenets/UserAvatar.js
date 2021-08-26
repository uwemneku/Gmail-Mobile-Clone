import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AccountsModal from './AccountsModal'
import Avatar from './Avatar'

/**
 * This renders the avatar of the user logged in
 * @param {object} props
*/
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
