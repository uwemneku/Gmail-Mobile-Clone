import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import BottomSheetNavigatior from './BottomSheetNavigatior'
import EmailDetails from '../Screens/EmailDetails'

const MainNavigation = createStackNavigator()

const Screens = [
    {
        name:'Home',
        component: BottomSheetNavigatior
    },
    {
        name:'ViewEmail',
        component: EmailDetails
    }
]
const RootNavigator = () => {
    return (
        <MainNavigation.Navigator
            screenOptions= {{
                headerShown:false,
            }}
            
        >
            {
                Screens.map((item, index) => {
                    return (
                        <MainNavigation.Screen
                            key = {item.name} 
                            name={item.name}
                            component={item.component}
                        />
                    )
                })
            }
        </MainNavigation.Navigator>
    )
}

export default RootNavigator

const styles = StyleSheet.create({})
