import React from 'react'
import { StyleSheet } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Emails from '../Screens/Emails'
import { Ionicons } from '@expo/vector-icons';
import Meet from '../Screens/Meet';

const BottomSheet = createBottomTabNavigator()

const Screens = [
    {
        name: 'Mail',
        component: Emails,
        icon: (color) => <Ionicons  name="mail-outline" size={30} color={color} />
    },
    {
        name:'Meet',
        component: Meet,
        icon: (color) => <Ionicons name="videocam-outline" size={35} color={color} />
    }
]

const BottomSheetNavigatior = () => {
    return (
        <BottomSheet.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            {
                Screens.map((item, index) => {
                    return (
                        <BottomSheet.Screen 
                            key={item.name}
                            name={item.name}
                            component={item.component}
                            options={({}) => ({
                                tabBarIcon: ({focused})=> item.icon(focused? 'red' : 'black'),
                                tabBarLabelStyle: {fontSize:12},
                                tabBarActiveTintColor:'red'
                            })}
                        />
                    )
                })
            }
        </BottomSheet.Navigator>
    )
}

export default BottomSheetNavigatior

const styles = StyleSheet.create({})
