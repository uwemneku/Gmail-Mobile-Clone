import React from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Typography from '../componenets/Typography';
import { useNavigation } from '@react-navigation/native';

const JoinMetting = () => {
    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView>
            {/* Header starts here */}
                <View style={styles.header} >
                    <Pressable onPress={()=>navigation.goBack()} >
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </Pressable>
                    <View style={{flex:1, justifyContent:'center', marginLeft:10}} >
                        <Typography text='Join with a code' bold textAlign='left' fontSize={20} />
                    </View>
                    <Typography text='Join' fontSize={14} />
                </View>
            {/* Header ends here */}

            <TextInput autoFocus={true} placeholder='Enter your meeting code' style={styles.input} />

        </KeyboardAvoidingView>
    )
}

export default JoinMetting

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        padding:20,
        paddingHorizontal:10
    },
    input:{
        borderColor:'gray',
        borderWidth:1,
        padding:10,
        borderRadius:10,
        margin:10
    }
})
