import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserAvatar from './UserAvatar';

/**
 * This is the header shown at the top of the Mail Screen
*/
const PrimaryHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container} >
             <View style={styles.main}>
                <TouchableOpacity onPress={()=>{navigation.openDrawer()}} >
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <UserAvatar />
            </View>
        </View>
    )
}

export default React.memo(PrimaryHeader)

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width:'100%',
        // overflow:'hidden'
    },
    main:{
        backgroundColor:'whitesmoke',
        padding:10,
        marginHorizontal:20,
        marginVertical:10,
        borderRadius:10,
        elevation:5,
        flexDirection:'row',
        justifyContent:'space-between',
        zIndex:50000000
        // overflow:'hidden'
    },
})
