import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
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
    const selectedEmails = useSelector(state => state.selectEmailSlice.selectedEmails)
    const dispatch = useDispatch()

    const animtedHeaderStyle = useAnimatedStyle(()=>({
        marginTop: interpolate(
                    animateValue.value,
                    [0, 1], [-100, 0],
                    Extrapolate.CLAMP)
    }))

    /*
        This effect could be rewritten as 
        useEffect(() => {
        if(selectedEmails.length === 0){
            animateValue.value = withTiming(1, {duration:250})
        }else{
            animateValue.value = withTiming(0, {duration:250})
        }
         }, [selectedEmails])
        
        Thereby elimnating the need for the 'canSelectEmails' state and 
        the second 'useEffect' statement but this would mean that we have to
        subscribe all EmailAvatar component to the selectedEmails, these would 
        cause the all EmailAvatar component to rerender when any one is selected.
        
        This way all EmailAvatar componenet are only rerendered when 'canSelectEmails' state changes
        which happens with the dispact statement below 
    */
    useEffect(() => {
        console.log(selectedEmails);
        if(selectedEmails.length === 0){
            dispatch(disableEmailSelection())
            animateValue.value = withTiming(0, {duration:250})
        }else{
            dispatch(enableEmailSelection())
            animateValue.value = withTiming(1, {duration:250})
        }
    }, [selectedEmails])

    return (
            <Animated.View View style={[styles.hidden, animtedHeaderStyle]}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
                <Avatar  size={40} text={`${selectedEmails.length}`} />
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
    }
})
