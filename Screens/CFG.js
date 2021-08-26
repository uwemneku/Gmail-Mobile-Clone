import React, {useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { withSpring } from 'react-native-reanimated'

const W = Dimensions.get('screen').width
const H = Dimensions.get('screen').height
const CFG = ({x, i}) => {
    const uu = useAnimatedStyle(()=>({
        transform: [{scale:withSpring(interpolate(
            x.value,
            [(i -1) * W,  (i*W), (i +1) * W],
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
        ), {overshootClamping:true}) },
        ],



        }))
        useEffect(() => {
            console.log(interpolate(
                x.value,
                [(i -1) * W, (i*W)],
                [30, 0],
                Extrapolate.CLAMP
            ));
        }, [])
        return (
        <Animated.View
            style={[styles.container, uu]} 
        />
    )
}

export default CFG

const styles = StyleSheet.create({
    container:{
        width: W, 
        height: H, 
        backgroundColor: 'red', 
        borderColor: 'white', 
        borderWidth: 20,
    }
})
