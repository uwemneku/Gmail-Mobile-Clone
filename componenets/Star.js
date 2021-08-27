import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import {unStarMail, starMail} from '../reducers/recievedEmailSlice'
import { Ionicons } from '@expo/vector-icons';

const Star = ({isStarred, id}) => {
    const dispatch = useDispatch()
    const handleIconPress = () => {
        if(isStarred){
            dispatch(unStarMail(id))
        } else{
            dispatch(starMail(id))
        }
    }

    return (
        <Pressable onPress={handleIconPress} >
            <Ionicons
                name={isStarred ? "star-sharp":"star-outline"} 
                size={20} 
                color={isStarred ? "gold" : "black"} 
            />
        </Pressable>
    )
}

export default Star

const styles = StyleSheet.create({})
