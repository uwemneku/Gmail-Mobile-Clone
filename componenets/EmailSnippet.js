import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LongPressGestureHandler,  PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import EmailAvatar from './EmailAvatar'
import Typography from './Typography'
import Toast from './Toast'
import { Portal } from '@gorhom/portal'
import LottieView from 'lottie-react-native'
import archiveLottie from '../lottie/archive.json'
import { useNavigation } from '@react-navigation/native'
import Star from './Star'

const halfScreenWidth = Dimensions.get('window').width / 2.5
const fullScreenWidth = Dimensions.get('window').width

/**
 * This renders a snippet of the email on the Mail screen of the app.
 * @param {object} props
 * @param {object} props.data 
 * @param {string} props.data.id The ID of the email in the global store
 * @param {string} props.data.name
 * @param {string} props.data.subject
 * @param {string} props.data.preview A snippet of the mail body
 * @param {string} props.data.time
 * @param {string} props.data.starred
 * @param {string} props.data.archived
*/
const EmailSnippet = ({data}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [toastVisibility, setToastVisibility] = useState(false)
    const isEmailSelectionModeEnabled = useSelector(state => state.selectEmailSlice.isEnabled)
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
            ctx.initialState = isSelected // store the selection state
          },

        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            runOnJS(setIsSelected)(false) //unselect this component
        },
        
        onEnd: (_, ctx) => {
            if(x.value > halfScreenWidth || Math.abs(_.velocityX) > 1550){
                const direction = x.value > -1 ?  fullScreenWidth : -fullScreenWidth // ensures vertical animation follows the direction of swipe 
                x.value = withSpring(direction, {overshootClamping:true});
                y.value = 1
                runOnJS(toggleToast)() // show undo tast message
                
            }
            else{
                x.value = withSpring(0, {overshootClamping:true});
                runOnJS(setIsSelected)(ctx.initialState) // set selection back to the initial state
            }
            
            
        },
    })

    const handleLongPress = () => {
        setIsSelected(true)
    }

    const handleAvatarClick = () => {
        isEmailSelectionModeEnabled && setIsSelected(!isSelected) // only select wif selction mode is enabled
    }
    
    useEffect(() => {
        !isEmailSelectionModeEnabled && setIsSelected(false) // This ensures that all selected emailSnippets are unselected whenever selection mode is disabled
    }, [isEmailSelectionModeEnabled])

    
    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{translateX: withSpring(x.value)}],
        backgroundColor: withTiming(isSelected ? 'skyblue' : 'white', {duration:250})
    }))
   
    const animatedContainerStyle = useAnimatedStyle(()=>({
        height: withDelay(500, withTiming(interpolate(y.value, [0, 1], [80, 0], Extrapolate.CLAMP), {duration:100,  easing:Easing.ease}))
    }))
    
    //actveOffsetX and activeOffsetY props are used to control when the pangesture should be active
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
                                <EmailAvatar isSelected={isSelected} id={data.id}  />
                            </Pressable>

                            {/* Begining of email details */}
                            <TouchableOpacity onPress={()=>navigation.navigate('ViewEmail')} style={{padding:10,}} >
                                <Typography  text={data.name} bold />
                                <Typography  text={data.subject} bold fontSize={14} />
                                <Typography  text={data.preview} fontSize={12}  />
                            </TouchableOpacity>
                            {/* End of email details*/}
                            
                            {/* Time and star icon starts here */}
                            <View style={{height:'100%', padding: 10, paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography  text={data.time} fontSize={12}  />
                                <Star isStarred={data.starred} id={data.id} />
                            </View>
                            {/* Time and start icon ends here */}
                        </Animated.View>

                        <Portal hostName="FAB" >
                            {/* The component is show in a parent portal provider located in Emails component */}
                            { toastVisibility && <Toast toggleToast={setToastVisibility} id={data.id} xValue={x} yValue={y} />   }  
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
