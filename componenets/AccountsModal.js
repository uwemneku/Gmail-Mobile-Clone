import React from 'react'
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Divider from './Divider'
import Typography from './Typography'
import UserAccounts from './UserAccounts'

const accountsDetails = [
    {
        name:'Uwem Israel',
        email:'uwemneku@gmail.com'
    },
    {
        name:'Uwem Israel',
        email:'uwemneku@gmail.com'
    },
    {
        name:'Uwem Israel',
        email:'uwemneku@gmail.com'
    },
    {
        name:'Uwem Israel',
        email:'uwemneku@gmail.com'
    },
]

const AccountsModal = ({close}) => {
    return (
            <Modal
               animationType='fade' 
               visible={true}
               transparent={true}
               
            >   
                <Pressable onPress={close} style={styles.container}>
                    <View style={styles.accounts}>
                        {
                            accountsDetails.map((item, index) => (
                                <View key={index} >
                                    <TouchableOpacity style={{paddingHorizontal:10}} onPress={close} >
                                        <UserAccounts />
                                    </TouchableOpacity>
                                    { (accountsDetails.length !== (index + 1)) && <Divider bgcolor='gray' verticalMargin={10} />}
                                </View>
                            ))
                        }
                    </View>
                </Pressable>
            </Modal>
    )
}

export default AccountsModal

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(22, 22, 22, 0.5)',
        flex:1,
    },
    accounts:{
        backgroundColor:'white',
        // padding:10,
        borderRadius:10,
        width: Dimensions.get('screen').width,
        maxWidth:300,
        marginVertical:20,
        paddingVertical:20
    }
})
