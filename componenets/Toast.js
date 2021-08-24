import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Typography from './Typography'

const Toast = ({action}) => {

    const handleAction = () => { console.log('k44kk');}
    return (
        <View style={styles.container} >
            <View style={styles.content} >
                <Typography text='Email has been achrived' />
                <Pressable onPress = {handleAction} >
                    <Typography text='Undo' bold />
                </Pressable>
            </View>
        </View>
    )
}

export default Toast

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center'
    },
    content:{
        padding:10,
        borderRadius:5,
        marginVertical:10,
        backgroundColor:'darkgrey',
        width:'90%',
        flexDirection:'row',
        justifyContent: 'space-between',

    }
   
})
