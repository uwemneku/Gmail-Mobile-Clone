import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../componenets/Avatar'
import Typography from '../componenets/Typography'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import lottieFile from '../lottie/coming soon.json'
import UserAvatar from '../componenets/UserAvatar';

const Meet = () => {
    const navigation = useNavigation()
    return (
        <View style={{backgroundColor:'white', flex:1}} >
            {/* Header starts here */}
                <View style={[styles.container, styles.header]} >
                    <Pressable onPress={()=>navigation.openDrawer()} style={{paddingHorizontal:5}} >
                        <Ionicons name="menu" size={30} color="black" />
                    </Pressable>
                    <Typography text="Meet" fontSize={20} />
                    <UserAvatar />
                </View>
            {/* Header ends here */}

            {/* Top buttons starts here */}
            <View style={styles.container} >
                <TouchableOpacity activeOpacity={0.6} style={[styles.button, {backgroundColor:'blue'}]}>
                    <Typography 
                        text='New meeting'
                        textAlign='center'
                        bold
                        color='white'
                        />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={[styles.button, {borderWidth:1}]}>
                    <Typography 
                        text='Join with a code'
                        textAlign='center'
                        bold
                        color='blue'
                    />
                </TouchableOpacity>
            </View>
            {/* Top buttons ends here */}

            {/* Lottie file starts here */}
                <View style={styles.lottieContainer} >
                    <AnimatedLottieView 
                        source={lottieFile}
                        autoPlay
                        loop
                        style={{
                            width:'80%'
                        }}
                    />
                </View>
            {/* Lottie file ends here */}
        </View>
    )
}

export default Meet

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
    },
    header:{
        alignItems:'center',
        paddingHorizontal:15
    },
    button:{
        flex:0.8,
        padding:10,
        borderRadius:5,
        marginHorizontal:5
    },
    lottieContainer:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }   
})
