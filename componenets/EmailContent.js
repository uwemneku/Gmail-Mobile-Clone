import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { withSpring } from 'react-native-reanimated'
import Typography from './Typography'

const W = Dimensions.get('screen').width
const H = Dimensions.get('screen').height
/**
 * 
 * @param {object} props
 * @param {Animated.SharedValue<number>} props.x 
 * @param {number} props.i The index of the email
 * @returns 
 */
const EmailContent = ({x, i}) => {
    

    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{scale:withSpring(
            interpolate( x.value,
                [(i -1) * W,  (i*W), (i +1) * W],
                [0.3, 1, 0.3],
                Extrapolate.CLAMP), {overshootClamping:true}) 
            }]
        }))
       
        return (
        <Animated.View
            style={[styles.container, animatedStyle]} 
        >
            <Typography text={`This is email number ${i+1}. Swipe vertically to view the next email`} 
                textAlign='center'
                bold
            />
        </Animated.View>
    )
}

export default EmailContent

const styles = StyleSheet.create({
    container:{
        width: W, 
        height: H, 
        backgroundColor: 'white', 
        borderColor: 'white', 
        borderWidth: 20,
    }
})
