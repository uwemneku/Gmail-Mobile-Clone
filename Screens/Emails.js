import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useAnimatedScrollHandler, withSpring } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import EmailSnippet from '../componenets/EmailSnippet'
import SecondaryHeader from '../componenets/SecondaryHeader';
import PrimaryHeader from '../componenets/PrimaryHeader';
import Typography from '../componenets/Typography';
import { Ionicons } from '@expo/vector-icons';
import { PortalHost, PortalProvider } from '@gorhom/portal';


const Emails = () => {
    const allEmails = useSelector(state => state.recievedEmailSlice.value)
    const [emails, setEmails] = useState(allEmails)
    const translateY = useSharedValue(0)
    const FABwidth = useSharedValue(0)
    const animateValue = useSharedValue(0)
    const clamp = (value, lowerBound, upperBound) => {
        "worklet";
        return Math.min(Math.max(lowerBound, value), upperBound);
      };
   
    const animatedHeaderStyle = useAnimatedStyle(()=>({
        transform: [{
            translateY : interpolate(
                        translateY.value,
                        [0, 70], [0, -70],
                        Extrapolate.CLAMP
                    )
        }]
    }))
    const animatedFABstyle = useAnimatedStyle(()=>({
        width: withSpring(FABwidth.value > 40 ? 50 : 200),
        paddingHorizontal: FABwidth.value > 40 ? 0 : 20,
    }))
    const animatedFABTextstyle = useAnimatedStyle(()=>({
        marginRight: withSpring(FABwidth.value > 40 ? -100 : 0),
        marginLeft: withSpring(FABwidth.value > 40 ? 20 : 0),
    }))
   

    const scrollhandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            const diff = event.contentOffset.y - ctx.prevY;
            translateY.value = clamp(translateY.value + diff, 0, 70);

            FABwidth.value = event.contentOffset.y
    
        },
        onBeginDrag: (event, ctx) => {
            ctx.prevY = event.contentOffset.y;
        },

        
    })
   
   

    

    return (
        <View style={styles.container}  >
        <PortalProvider>
            <View style={{position:'absolute', width:'100%', zIndex:3000000}}>
                <SecondaryHeader />
            </View>
            <Animated.View style={[styles.header, animatedHeaderStyle]}>
                <PrimaryHeader />
            </Animated.View>
            <View style={{flex:1}}  >
                <FlatList 
                    style={{flex:1}}
                    renderScrollComponent= {(props) => 
                        <Animated.ScrollView {...props} 
                            contentContainerStyle={{paddingTop:60, paddingBottom: 100,}} 
                            onScroll={scrollhandler}  
                        />
                        }
                    data={allEmails}
                    renderItem = {({item, index}) => {
                        if(!item.archived){
                            return (
                                <EmailSnippet 
                                    id={item.id} 
                                    name={item.sender}
                                    subject={item.subject}
                                    preview={item.preview}
                                    time={item.time}
                                    selected={item.selected}
                                    starred={item.starred}
                                    archived = {item.archived}
                                />
                            )
                        }
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.floatingItems}>
                <Animated.View style={[styles.FAB, animatedFABstyle]} >
                    <Ionicons name="menu" size={24} color="black" />
                    <Animated.View style={[animatedFABTextstyle]} >
                        <Typography text='Compose' textAlign='right' />
                    </Animated.View>
                </Animated.View>
                <PortalHost name="FAB" />
            </View>
        </PortalProvider>
        </View>
    )
}

export default React.memo(Emails)

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        position:'relative'
    },
    header:{
        position:'absolute',
        width:'100%',
        backgroundColor:'white',
        zIndex:400,
    },
    floatingItems:{
        width:'100%',
        position:'absolute',
        bottom:20,
        alignItems:'flex-end',
        overflow:'hidden',
        zIndex:400000,
    },
    FAB:{
        right:20,
        height:50,
        elevation:5,
        marginVertical:10,
        borderRadius:100,
        overflow:'hidden',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between'

    }
})
