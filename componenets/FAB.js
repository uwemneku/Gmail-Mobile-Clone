import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons';
import Typography from './Typography';

/**
 * This renders the floating action button
 * @param {object} props
 * @param {Animated.SharedValue<number>} props.animatedValue Animated value passed to the component to animated its contents 
*/
const FAB = ({animatedValue}) => {
    const [showText, setShowText] = useState(true)
    const animatedFABstyle = useAnimatedStyle(()=>({
        width: withSpring(animatedValue.value > 40 ? 50 : 200, {overshootClamping:true}),
    }))
    const animatedFABTextstyle = useAnimatedStyle(()=>({
        opacity: animatedValue.value > 30 ? 0 : 1,
        flex:1,
    }))

    useEffect(() => {
        animatedValue.value > 40 ? setShowText(false) : setShowText(true)
    }, [animatedValue.value])
    return (
        <Animated.View style={[styles.FAB, animatedFABstyle]} >
            <Ionicons name="md-pencil-sharp" size={24} color="black" />
            <Animated.View style={[animatedFABTextstyle]} >
                <Typography text='Compose' textAlign='center' bold />
            </Animated.View>
        </Animated.View>
    )
}

export default React.memo(FAB)

const styles = StyleSheet.create({
    FAB:{
        right:20,
        height:50,
        elevation:5,
        paddingLeft:15,
        marginVertical:10,
        borderRadius:100,
        overflow:'hidden',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'center'

    }
})
