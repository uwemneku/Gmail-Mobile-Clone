import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { disableEmailSelection, enableEmailSelection } from '../reducers/selectEmailsSlice'
import Avatar from './Avatar'
import { Ionicons } from '@expo/vector-icons';
import { withDelay } from 'react-native-reanimated'
import Typography from './Typography'
import { useNavigation } from '@react-navigation/native'


const W = Dimensions.get('screen').width
const H = Dimensions.get('screen').height
/**
 * This is the header shown at the top of the EmailDetails Screen when a mail is selected
*/
const SecondaryHeader = () => {
    const animateValue = useSharedValue(0)
    const [openModal, setOpenModal] = useState(false)
    const navigaiton = useNavigation()

    const animtedMenuStyle = useAnimatedStyle(()=>({
        marginRight: withTiming(interpolate(animateValue.value,
            [0, 1],
            [-300, 0],
            Extrapolate.CLAMP    
        ), {duration: 500}, ()=>{})
    }))

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        animateValue.value = openModal ? 1 : 0 
    }, [openModal])

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={()=>navigaiton.goBack()} >
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
                <View style={styles.iconsContainer} >
                    <Ionicons name="md-trash-outline" size={24} color="black"  style={{paddingHorizontal:10}}/>
                    <Ionicons name="md-archive-outline" size={24} color="black"  style={{paddingHorizontal:10}}/>
                    <Ionicons name="md-mail-outline" size={24} color="black"  style={{paddingHorizontal:10}}/>
                    <View style={styles.ellipsis} >
                        <TouchableOpacity onPress={toggleModal} >
                            <Ionicons name="ellipsis-vertical" size={24} color="black" style={{paddingHorizontal:10}} />
                        </TouchableOpacity>
                            <Modal
                                visible={openModal}
                                transparent={true}
                            >
                                <Pressable style={{width:W, height:H}} onPress={toggleModal} >
                                    <Animated.View style={[styles.menu, animtedMenuStyle]} >
                                        <Typography text="Move to" />
                                        <Typography text="Snooze" />
                                        <Typography text="Change labels" />
                                        <Typography text="Mark as important" />
                                        <Typography text="Mute" />
                                        <Typography text="Print" />
                                        <Typography text="Report spam" />
                                        <Typography text="Add to Task" />
                                        <Typography text="Help and feedback" />
                                    </Animated.View>
                                </Pressable>
                            </Modal>
                    </View>

                </View>
        </View>
    )
}

export default React.memo(SecondaryHeader)

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'gray'
    },
    iconsContainer:{
        paddingVertical:10,
        width:'50%',
        zIndex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    ellipsis:{
        position:'relative'
    },
    menu:{
        position:'absolute',
        padding:20,
        right:0,
        width:200,
        height:400,
        borderRadius:10,
        elevation:5,
        backgroundColor:'white',
        overflow:'hidden',
        justifyContent:'space-between'
    }
})
