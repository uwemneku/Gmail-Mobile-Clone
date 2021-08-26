import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import EmailSnippet from '../componenets/EmailSnippet'
import SelectedHeader from '../componenets/SelectedHeader';
import PrimaryHeader from '../componenets/PrimaryHeader';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import FAB from '../componenets/FAB';


const Emails = () => {
    const allEmails = useSelector(state => state.recievedEmailSlice.value)
    const translateY = useSharedValue(0)
    const FABwidth = useSharedValue(0)
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
            <View style={[styles.header, {zIndex:42}]}>
                <SelectedHeader />
            </View>
            <Animated.View style={[styles.header, animatedHeaderStyle]}>
                <PrimaryHeader />
            </Animated.View>
            <View style={{flex:1}}  >
                <FlatList 
                    style={{flex:1}}
                    renderScrollComponent= {(props) => 
                        // This allows us to use 'useAnimatedScrollHandler' to handle animations that are dependent on scrolling
                        <Animated.ScrollView {...props} 
                            contentContainerStyle={{paddingTop:60, paddingBottom: 100,}} 
                            onScroll={scrollhandler}  
                        />
                        }
                    data={allEmails}
                    renderItem = {({item}) => {
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
                <FAB animatedValue={FABwidth} />
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
        zIndex:40,
    },
    floatingItems:{
        width:'100%',
        position:'absolute',
        bottom:20,
        alignItems:'flex-end',
        overflow:'hidden',
        zIndex:400000,
    },

})
