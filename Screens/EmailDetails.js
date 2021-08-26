import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useAnimatedScrollHandler } from 'react-native-reanimated'
import SecondaryHeader from '../componenets/SecondaryHeader'
import Typography from '../componenets/Typography'
import CFG from './CFG'

const EmailDetails = ({id}) => {
    const navigation = useNavigation()
    const tex = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll:(_, ctx) => {
           tex.value = _.contentOffset.x
        }
    })

    const style33 = useAnimatedStyle(()=>({
        transform:[{translateY:tex.value}]
    }))

    
    return (
        <View>
            <SecondaryHeader />
            <View>
                {
                    <FlatList
                        data={new Array(10).fill(1)}
                        renderItem = {({item, index})=>(

                                <CFG x={tex} i={index} />

                        )}
                        keyExtractor={(item, index) => index.toString()}
                        renderScrollComponent = {(props)=>(
                            <Animated.ScrollView {...props}  horizontal={true}  
                                snapToInterval={Dimensions.get('screen').width}
                                decelerationRate={'normal'}
                                disableIntervalMomentum={true}
                                scrollEventThrottle={16}
                                onScroll={scrollHandler}
                                // pagingEnabled={true}
                            >

                            </Animated.ScrollView>
                        )}
                    />
                }
            </View>
            
        </View>
    )
}

export default EmailDetails

const styles = StyleSheet.create({
    ff:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
        backgroundColor: 'red',
        borderColor:'white',
        borderWidth:10
    }
})
