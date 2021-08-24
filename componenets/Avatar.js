/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Image, View} from 'react-native';
import Typography from './Typography';

/**
 * {Object} props
 * {Number} props.size
*/
 function Avatar({size=50, imageUri, text, bgColor='grey'}) {
  const [avatarUri, setUserAvatarUri] = useState(null)
 
  return (
    <View
      style={[styles.conatiner, {width:size, height:size, backgroundColor:bgColor}]}
    >
      {
        avatarUri ? 
          <Image resizeMode='cover'  source={{uri: avatarUri}} style={styles.image} />
          :
          text && <Typography text={text} />
      }
    </View>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    borderRadius: 6000,
    overflow: 'hidden',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default React.memo(Avatar);
