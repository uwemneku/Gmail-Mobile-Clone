import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Typography from './Typography'
import {archiveMail} from '../reducers/recievedEmailSlice'
import { useDispatch } from 'react-redux'

/**
 * @param {object} props
 * @param {Animated.SharedValue<number>} props.xValue Animated value of the EmailSnippet componenet that was swiped
 * @param {Animated.SharedValue<number>} props.yValue Animated value of the EmailSnippet componenet that was swiped
 * @param {string} props.id ID of the email of the EmailSnippet component 
*/
const Toast = ({xValue, yValue, id}) => {
    const [message, setMessage] = useState('Email has been achrived')
    const dispact = useDispatch()
    const translateY = useSharedValue(0)
    const isUndoClicked = useRef(false) //If true the emailsnippet displaying this toast message is unmounted
  
    const handleAction = () => { 
        setMessage('Removed from achrive')
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
            //This action changes the acrchive state of the email and unmount its Emailsnippet component
            !isUndoClicked.current && dispact(archiveMail(id))
        }
    }, [])
 
    return (
        <Animated.View style={[styles.container, animatedContainerstyles]} >
            <View style={styles.content} >
                <Typography text={message} />
                <TouchableOpacity onPress = {handleAction} style={{paddingHorizontal:15, backgroundColor:'white'}} >
                    <Typography text='Undo' bold />
                </TouchableOpacity>
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
