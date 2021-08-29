import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from './Avatar'
import Typography from './Typography'


const EmailAccounts = () => {
    return (
        <View style={styles.container} >
            <Avatar size={40} />
            <View style={{paddingHorizontal:10}} >
                <Typography text='Uwem Israel' fontSize={14} bold />
                <Typography text="uwemneku@gmail.com" fontSize={12} />
            </View>
        </View>
    )
}

export default EmailAccounts

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white'
    }
})
