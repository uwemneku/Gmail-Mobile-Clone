import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LongPressGestureHandler,  PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {deselectEmail, selectEmail } from '../reducers/selectEmailsSlice'
import {unStarMail, starMail} from '../reducers/recievedEmailSlice'
import EmailAvatar from './EmailAvatar'
import Typography from './Typography'
import { Ionicons } from '@expo/vector-icons';
import Toast from './Toast'
import { Portal } from '@gorhom/portal'
import LottieView from 'lottie-react-native'
import archiveLottie from '../lottie/archive.json'
import { useNavigation } from '@react-navigation/native'

const halfScreenWidth = Dimensions.get('window').width / 2.5
const fullScreenWidth = Dimensions.get('window').width

/**
 * This renders a snippet of the email on the Mail screen of the app.
 * @param {object} props
 * @param {string} props.id The ID of the email in the global store
 * @param {string} props.name
 * @param {string} props.subject
 * @param {string} props.preview A snippet of the mail body
 * @param {string} props.time
 * @param {string} props.starred
 * @param {string} props.archived
*/
const EmailSnippet = ({id, name, subject, preview, time, selected, starred, archived}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [toastVisibility, setToastVisibility] = useState(false)
    const canSelectEmails = useSelector(state => state.selectEmailSlice.value) // Controls if an email can be selected by pressing the email avatart
    const dispatch = useDispatch()
    const navigation = useNavigation()
    
    const x = useSharedValue(0)
    const y = useSharedValue(0)

   //The state change is wrapped in this function to make if safe to
   //be called from 'runOnJs' in the gestureHandler below
    const toggleToast = () => {
        setToastVisibility(true) 
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.initialState = isSelected 
          },

        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            runOnJS(setIsSelected)(false)
        },
        
        onEnd: (_, ctx) => {
            console.log(_.velocityX);
            if(x.value > halfScreenWidth || Math.abs(_.velocityX) > 1550){
                const n = x.value > -1 ?  fullScreenWidth : -fullScreenWidth
                x.value = withSpring(n, {overshootClamping:true});
                y.value = 1
                runOnJS(toggleToast)()
                
            }
            else{
                x.value = withSpring(0, {overshootClamping:true});
                runOnJS(setIsSelected)(ctx.initialState)
            }
            
            
        },
    })

    const handleLongPress = () => {
        setIsSelected(true)
    }

    const handleAvatarClick = () => {
        canSelectEmails && setIsSelected(!isSelected)
    }

    const handleIconPress = () => {
        starred ? dispatch(unStarMail(id)) : dispatch(starMail(id))
    }

    useEffect(() => {
       isSelected ? dispatch(selectEmail(id)) : dispatch(deselectEmail(id))
    }, [isSelected])
   
    useEffect(() => {
        console.log('mounted');
        return () => console.log('unmounted'); 
    }, [])

    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{translateX: withSpring(x.value)}],
        backgroundColor: withTiming(isSelected ? 'skyblue' : 'white', {duration:250})
    }))
   
    const animatedContainerStyle = useAnimatedStyle(()=>({
        height: withDelay(500, withTiming(interpolate(y.value, [0, 1], [80, 0], Extrapolate.CLAMP), {duration:100,  easing:Easing.ease}))
    }))
    
    //actveOffsetX and activeOffsetY props are used to set when the pangesture is active
    //This alows vertical gestures to be passed to the parent scroll componenet
    return (
        <PanGestureHandler  activeOffsetX={[-50, 50]} activeOffsetY={[-1000, 1000]}  onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <LongPressGestureHandler onActivated={handleLongPress} >
                    <View style={{alignItems:'center'}} >

                        {/* Start of view seen when email is swiped */}
                        <View style={styles.hiddenElement} >
                            <View  style={{width:60, height:60}} >
                                <LottieView
                                    source={archiveLottie} 
                                    autoPlay 
                                    loop
                                    style={{
                                        width: '100%',
                                    }} 
                                />
                            </View>
                            <View  style={{width:60, height:60}} >
                                <LottieView
                                    source={archiveLottie} 
                                    autoPlay 
                                    loop
                                    style={{
                                        width: '100%',
                                    }} 
                                />
                            </View>
                        </View>
                        {/* End of view seen when email is swiped */}

                        <Animated.View style={[styles.snippet, animatedStyle]} >
                            <Pressable onPress={handleAvatarClick} style={{alignItems:'center'}} >
                                <EmailAvatar isSelected={isSelected} />
                            </Pressable>

                            {/* Begining of email details */}
                            <TouchableOpacity onPress={()=>navigation.navigate('ViewEmail')} style={{padding:10,}} >
                                <Typography  text={name} bold />
                                <Typography  text={subject} bold fontSize={14} />
                                <Typography  text={preview} fontSize={12}  />
                            </TouchableOpacity>
                            {/* End of email details*/}
                            
                            {/* Time and star icon starts here */}
                            <View style={{height:'100%', padding: 10, paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography  text={time} fontSize={12}  />
                                <Pressable onPress={handleIconPress} >
                                    <Ionicons 
                                        name={starred ? "star-sharp":"star-outline"} 
                                        size={20} 
                                        color={starred ? "gold" : "black"} 
                                    />
                                </Pressable>
                            </View>
                            {/* Time and start icon ends here */}
                        </Animated.View>
                        <Portal hostName="FAB" >
                            {/* The component is show in the parent portal provider (in Emails component) */}
                            { toastVisibility && <Toast toggleToast={setToastVisibility} id={id} xValue={x} yValue={y} />   }  
                        </Portal>
                    </View>
                </LongPressGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default React.memo(EmailSnippet)

const styles = StyleSheet.create({
    container:{
        overflow:'hidden',
    },
    snippet:{
        flexDirection:'row',
        alignItems:'center',
        position:'relative',
        height:'100%',
        width:'105%',
        padding:10,
        paddingHorizontal:30,
        borderRadius:10,
    },
    hiddenElement:{
        position:'absolute',
        backgroundColor:'yellow',
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }

})
