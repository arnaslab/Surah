import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';

const IconButton = ({ onPress, icon, size = 25, color, style, disabled }) => (
  <TouchableOpacity 
		activeOpacity={0.7}
		underlayColor="#000000"
		onPress={onPress}
		style={{
			width: size + 10,
      height: size + 10,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
			...style
		}}
		disabled={disabled}
	>
    <Icon name={icon} height={size} width={size} fill={disabled ? '#ada9bf' : color}/>
  </TouchableOpacity>
)

export default IconButton;