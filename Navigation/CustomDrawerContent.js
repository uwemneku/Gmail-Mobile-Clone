import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Typography from '../componenets/Typography';
import Divider from './../componenets/Divider';
import { Ionicons } from '@expo/vector-icons';

const data = [
    {
        name:'',
        list: [
            {name:'All Inboxes', action:'', icon:'albums-outline', count:0}
        ]
    },
    {
        name:'',
        list: [
            {name:'Primary', action:'', icon:'albums', count:0},
            {name:'Social', action:'', icon:'people-outline', count:0},
            {name:'Promotions', action:'', icon:'pricetag-outline', count:0},
        ]
    },
    {
        name:'ALL LABELS',
        list: [
            {name:'Starred', action:'', icon:'star-sharp', count:0},
            {name:'Snoozed', action:'', icon:'timer-outline', count:0},
            {name:'Important', action:'', icon:'alert-circle-outline', count:0},
            {name:'Sent', action:'', icon:'send-outline', count:0},
            {name:'Scheduled', action:'', icon:'time-outline', count:0},
            {name:'Outbox', action:'', icon:'open-outline', count:0},
            {name:'Draft', action:'', icon:'document-outline', count:0},
            {name:'All mail', action:'', icon:'albums', count:0},
            {name:'Spam', action:'', icon:'', count:0},
            {name:'Bin', action:'', icon:'', count:0},
        ]
    },
]
function CustomDrawerContent(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
          <View style={{padding:10, marginVertical:10}} >
            <Typography text='GMAIL' fontSize={18} bold />
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
                                    fontSize={16} 
                                    text={item.name} 
                                />
                            </View>
                          }
                          {
                              item.list.map(link => {
                                  return (
                                      <DrawerItem 
                                        key={link.name}   
                                        label={link.name} 
                                        onPress={() => props.navigation.navigate('Mail')} 
                                        icon ={({ focused, color, size }) => <Ionicons color={color} size={size} name={link.icon !== '' ? link.icon : 'heart-outline'} />}
                                        labelStyle={{marginLeft:-20}}
                                      />
                                  )
                              })
                          }
                          <Divider verticalMargin={5} />
                      </View>
                  )
              })
          }
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent

const styles = StyleSheet.create({})
