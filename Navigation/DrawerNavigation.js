import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import RootNavigator from './RootNavigator'
import PrimaryHeader from '../componenets/PrimaryHeader'
import Typography from '../componenets/Typography'
import { useNavigation } from '@react-navigation/native'
import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown:false,
            }}
            drawerContent={(props) => (
                <CustomDrawerContent {...props} />
            )}
        >
            <Drawer.Screen 
                name='Scc'
                component ={RootNavigator}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})
