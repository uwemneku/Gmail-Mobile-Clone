/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';

/** This componenet renders a straight horizontal line
 * @param {object} props
 * @param {string} props.bgcolor The bacground color of the divider
 * @param {number} props.verticalMargin The vertical margin for the divider
*/
export default function Divider({bgcolor = 'black', verticalMargin = 0}) {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: bgcolor,
        marginVertical: verticalMargin,
      }}
    />
  );
}
