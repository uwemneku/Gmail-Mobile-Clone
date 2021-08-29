import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import Typography from '../componenets/Typography'
import { Ionicons } from '@expo/vector-icons';


const list = [
    {
        name: 'Get a meeting link to share',
        icon:'link',
        action: ''
    },
    {
        name: 'Start an instant meeting',
        icon:'videocam-outline',
        action: ''
    },
    {
        name: 'Schedule in Google Calender',
        icon:'ios-calendar-outline',
        action: ''
    },
]

export default function NewMeeting({open}) {
    const animatedValue = useSharedValue(500)
    const navigation = useNavigation()

    const handleNavigation = () => {
        navigation.goBack()
    }


    useEffect(() => {
        animatedValue.value = 0
    }, [])



    const panhandler = useAnimatedGestureHandler({
        onStart:({absoluteY}, ctx) => {
            ctx.startPostion = animatedValue.value
        },
        onActive: ({translationY}, ctx) => {
            if (animatedValue.value > -10) {
                
                animatedValue.value = translationY + ctx.startPostion
            }
        },
        onEnd: () => {
            if (animatedValue.value < 150) {
                animatedValue.value = 0
            } else{
                animatedValue.value = 500
                runOnJS(handleNavigation)()
            }
            
        },

    })

    const animatedViewStyle = useAnimatedStyle(() => ({
        transform: [{translateY: withSpring(animatedValue.value, {overshootClamping:true})}]
    }))

    return (
                        <View style={styles.container}  >
                            <Pressable style={{flex:1}} onPress={handleNavigation} />
                            <PanGestureHandler  onGestureEvent={panhandler}  >
                                <Animated.View style={[styles.text, animatedViewStyle]} >
                                    <View style={{alignItems:'center', padding:10}} >
                                        <View style={{backgroundColor:'gray', width:50, height:10, borderRadius:20}} />
                                    </View>
                                    <View style={{padding:20, justifyContent:'space-around', height:200}} >
                                    {
                                            list.map(item => (
                                                <View key={item.name} style={styles.list} >
                                                    <Ionicons name={item.icon} size={24} color="black" style={{paddingRight:20}} />
                                                    <Typography text = {item.name} bold />
                                                </View>
                                            ))
                                        }
                                        <Pressable onPress={handleNavigation} style={styles.list}>
                                            <Ionicons name='close' size={24} color="black" style={{paddingRight:20}} />
                                            <Typography text="Close" bold />
                                        </Pressable>
                                    </View>
                                </Animated.View>
                            </PanGestureHandler>
                        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(15, 15, 15, 0.5)',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'absolute',
        top:0,
        overflow:'hidden'
    },
    text:{
        backgroundColor:'white',
        paddingBottom:10,
    },
    list:{
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center'
    }
})