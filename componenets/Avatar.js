/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Typography from './Typography';

/**
 * @param {Object} props
 * @param {Number} props.size The size of the avatar
 * @param {imageUri} props.imageUri The URI of he image to display
 * @param {string} props.text The text to displat if uri is missing
 * @param {string} props.bgColor The bacground color of the avatar. This is only visible when the componenet has no URI
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
