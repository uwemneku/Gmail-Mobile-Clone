import React from 'react'
import { StyleSheet } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import BottomSheetNavigatior from './BottomSheetNavigatior'
import ViewEmails from '../Screens/ViewEmails'
import NewMeeting from '../Screens/NewMeeting'
import JoinMetting from '../Screens/JoinMetting'

const MainNavigation = createStackNavigator()

const Screens = [
    {
        name:'Home',
        component: BottomSheetNavigatior
    },
    {
        name:'ViewEmail',
        component: ViewEmails
    },
    {
        name:'NewMeeting',
        component: NewMeeting
    },
    {
        name:'JoinMetting',
        component: JoinMetting
    },
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
