import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import Typography from '../componenets/Typography'

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
                                        <Typography 
                                            text="Get a meeting link to share"
                                            bold
                                        />
                                        <Typography 
                                            text="Start an instant meeting"
                                            bold
                                        />
                                        <Typography 
                                            text="Schedule in Google Calender"
                                            bold
                                        />
                                        <Typography 
                                            text="Close"
                                            bold
                                        />
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
        paddingBottom:100,
    }
})