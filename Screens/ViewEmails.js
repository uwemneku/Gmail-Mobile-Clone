import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useAnimatedScrollHandler } from 'react-native-reanimated'
import SecondaryHeader from '../componenets/SecondaryHeader'
import EmailContent from '../componenets/EmailContent'

const ViewEmails = ({id}) => {
    const navigation = useNavigation()
    const {scrollPosition} = useRoute().params
    const animatedValue = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll:(_, ctx) => {
           animatedValue.value = _.contentOffset.x
        }
    })


    useEffect(() => {
    }, [])
    return (
        <View>
            <SecondaryHeader />
            <View>
                {
                    <FlatList
                        horizontal={true}
                        initialScrollIndex={scrollPosition}
                        data={new Array(10).fill(1)}
                        renderItem = {({item, index})=>(

                                <EmailContent x={animatedValue} i={index} />

                        )}
                        keyExtractor={(item, index) => index.toString()}
                        renderScrollComponent = {(props)=>(
                            <Animated.ScrollView {...props}  
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

export default ViewEmails

