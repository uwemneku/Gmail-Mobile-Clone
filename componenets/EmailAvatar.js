import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Avatar from './Avatar'


/**
 * This component renders the avatar for all emails, when an email is selected it rotates to display a tick
 * @param {object} propps 
 * @param {boolean} props.isSelected Indicates if the email snippet rendering this component is selected 
 */ 
const EmailAvatar = ({isSelected}) => {
    const animateValue = useSharedValue(0)
    
    useEffect(() => {
      animateValue.value = isSelected ? 1 : 0
    }, [isSelected])
    
    const animatedContainerStyle = useAnimatedStyle(()=>({
        transform: [{rotateY: withTiming(
                        interpolate(
                                        animateValue.value, [0, 1], [0, 180], 
                                        Extrapolate.CLAMP) + 'deg', 
                                        {duration: 250, easing: Easing.ease}
                                    )
                    }],
       
    }))

    const avatarContainer = useAnimatedStyle(()=>({
        opacity: withTiming(interpolate(animateValue.value, [0, 1], [1, 0], Extrapolate.CLAMP), {duration: 250, easing: Easing.ease})
    }))

    return (
        <View >
            <Animated.View style={[styles.container, animatedContainerStyle]} >
                <View style={styles.avatar}>
                        <Animated.View style={avatarContainer} >
                            <Avatar size={50} />
                        </Animated.View>
                        <View style={[styles.content]} >
                            <Avatar size={50} text='loo' bgColor='white' />
                        </View>
                </View>
            </Animated.View>
        </View>
    )
}

export default React.memo(EmailAvatar);


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        position:'relative',
        width:'100%',
        height:'100%'
    },
    avatar:{
        zIndex:10,
        justifyContent:'center',
        alignItems:'center'
    },
    content:{
        width:60,
        height:60,
        borderRadius:100,
        position:'absolute',
        zIndex:-1,
        justifyContent:'center',
        alignItems:'center',
        transform:[{rotateY:'180deg'}]
    }
})
