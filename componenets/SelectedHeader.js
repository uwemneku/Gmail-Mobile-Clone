import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { disableEmailSelection, enableEmailSelection } from '../reducers/selectEmailsSlice'
import Avatar from './Avatar'
import { Ionicons } from '@expo/vector-icons';

/**
 * This is the header shown at the top of the Mail Screen when a mail is selected
*/
const SelectedHeader = () => {
    const animateValue = useSharedValue(0)
    const selectedEmailsArray = useSelector(state => state.selectEmailSlice.selectedEmails)
    const dispatch = useDispatch()

    const animtedHeaderStyle = useAnimatedStyle(()=>({
        marginTop: interpolate(
                    animateValue.value,
                    [0, 1], [-100, 0],
                    Extrapolate.CLAMP)
    }))

    const handlebackPress = () => {
        dispatch(disableEmailSelection()) //disable selection mode
    }

    useEffect(() => {
        if(selectedEmailsArray.length === 0){
            dispatch(disableEmailSelection()) // disable selection mode
            animateValue.value = withTiming(0, {duration:250}) // move this component out of screen
        }else{
            dispatch(enableEmailSelection()) // anable selection mode
            animateValue.value = withTiming(1, {duration:250}) // move component into screen
        }
    }, [selectedEmailsArray])

    return (
            <Animated.View View style={[styles.hidden, animtedHeaderStyle]}>
                <TouchableOpacity onPress={handlebackPress} >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Avatar  size={40} text={`${selectedEmailsArray.length}`} />
            </Animated.View>
    )
}

export default React.memo(SelectedHeader)

const styles = StyleSheet.create({
    container:{
        position:'relative',
        width:'100%',
    },
    hidden:{
        backgroundColor:'yellow',
        width:'100%',
        padding:20,
        paddingVertical:10,
        zIndex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
})
