import React, { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated'
import Typography from './Typography'
import {archiveMail, unArchiveMail} from '../reducers/recievedEmailSlice'
import { useDispatch } from 'react-redux'

const Toast = ({xValue, yValue, id}) => {
    const dispact = useDispatch()
    const translateY = useSharedValue(0)
    const isUndoClicked = useRef(false)
    const handleAction = () => { 
        xValue.value = 0
        yValue.value = 0
        isUndoClicked.current = true
    }
    const animatedContainerstyles = useAnimatedStyle(()=>({
        marginBottom: withSpring(interpolate(
            translateY.value,
            [0, 1], [-60, 0],
            Extrapolate.CLAMP
        ))
    }))
    useEffect(() => {
        translateY.value = 1;
        return () => {
            !isUndoClicked.current && dispact(archiveMail(id))
        }
    }, [])
    return (
        <Animated.View style={[styles.container, animatedContainerstyles]} >
            <View style={styles.content} >
                <Typography text='Email has been achrived' />
                <Pressable onPress = {handleAction} >
                    <Typography text='Undo' bold />
                </Pressable>
            </View>
        </Animated.View>
    )
}

export default React.memo(Toast)

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
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
