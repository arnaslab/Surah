import React from 'react';
import { View } from 'react-native';

const EightPointBurst = ({ style, size, color, children }) => {
  return (
    <View style={{
      position: 'relative',
      ...style
    }}>
      <View style={{
        width: size,
        height: size,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: color,
        transform: [{ rotate: "20deg" }]
      }} />
      <View style={{
        width: size,
        height: size,
        position: "absolute",
        borderWidth: 2,
        borderColor: color,
        backgroundColor: "#ffffff",
        top: 0,
        left: 0,
        transform: [{ rotate: "155deg" }]
      }} />
      <View style={{
        width: size - 4.5,
        height: size - 4.5,
        position: "absolute",
        backgroundColor: "#ffffff",
        top: 2,
        left: 2,
        transform: [{ rotate: "20deg" }]
      }} />
      <View style={{
        position: 'absolute'
      }}>
        {children}
      </View>
    </View>
  );
};

export default EightPointBurst;