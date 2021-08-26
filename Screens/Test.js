import React from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Typography from '../componenets/Typography'
import CFG from './CFG'

const Test = () => {
    const i = useSharedValue(0)
    const u = useAnimatedScrollHandler({
        onScroll:(_, y)=>{
            i.value = _.contentOffset.x
            console.log(i.value);
        }
    })
    const uu = useAnimatedStyle(()=>({
        marginTop: i.value
    }))
    return (
        <View>
            {/* <Animated.View style={uu}>
                <Typography  text='hhh'/>
            </Animated.View> */}
      
            <Animated.ScrollView horizontal={true} onScroll={u} >
                {
                    [1, 2, 3].map((e, g) => 
                            <CFG key={g} x={i} i ={g} />
                        )
                }
            </Animated.ScrollView>
            <Text></Text>
        </View>
    )
}

export default Test

const styles = StyleSheet.create({
    ff:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
        backgroundColor: 'red',
        borderColor:'white',
        borderWidth:10,
        transform:[{translateY:2}]
    }
})
