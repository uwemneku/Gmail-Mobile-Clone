import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Typography from '../componenets/Typography';
import Divider from './../componenets/Divider';

const data = [
    {
        name:'',
        list: [
            {name:'All Inboxes', action:'', icon:'', count:0}
        ]
    },
    {
        name:'',
        list: [
            {name:'Primary', action:'', icon:'', count:0},
            {name:'Social', action:'', icon:'', count:0},
            {name:'Promotions', action:'', icon:'', count:0},
        ]
    },
    {
        name:'ALL LABELS',
        list: [
            {name:'Starred', action:'', icon:'', count:0},
            {name:'Snoozed', action:'', icon:'', count:0},
            {name:'Important', action:'', icon:'', count:0},
            {name:'Sent', action:'', icon:'', count:0},
            {name:'Scheduled', action:'', icon:'', count:0},
            {name:'Outbox', action:'', icon:'', count:0},
            {name:'Draft', action:'', icon:'', count:0},
            {name:'All mail', action:'', icon:'', count:0},
            {name:'Spam', action:'', icon:'', count:0},
            {name:'Bin', action:'', icon:'', count:0},
        ]
    },
    {
        name:'GOOGLE APPS',
        list: [
            {name:'Calender', action:'', icon:'',},
            {name:'Contacts', action:'', icon:'',},
            {name:'Settings', action:'', icon:'',},
            {name:'Help and feedback', action:'', icon:'',},
        ]
    },
]
function CustomDrawerContent(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (
      <DrawerContentScrollView {...props}>
          <View style={{padding:10, marginVertical:20}} >
            <Typography text='GMAIL' fontSize={20} bold />
          </View>
          <Divider />
          {
              data.map((item, index) => {
                  return (
                      <View key={index} >
                          {
                            item.name !== '' && 
                            <View style={{padding:10}} >
                                <Typography 
                                    bold 
                                    text={item.name} 
                                />
                            </View>
                          }
                          {
                              item.list.map(link => {
                                  return (
                                      <DrawerItem key={link.name}  label={link.name} onPress={() => props.navigation.closeDrawer()} />
                                  )
                              })
                          }
                          <Divider verticalMargin={10} />
                      </View>
                  )
              })
          }
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent

const styles = StyleSheet.create({})
