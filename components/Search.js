import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from './Icon';

const Search = ({ value, onChange }) => {
	return (
		<View style={{
			height: 50,
			margin: 10,
			paddingHorizontal: 20,
			borderRadius: 50,
			backgroundColor: '#f1f0f4',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}}>
			<TextInput 
				placeholder="Search surah..."
				style={{
					fontSize: 18,
					flexGrow: 1
				}}
				value={value}
				onChangeText={text => onChange(text)}
			/>
			<Icon
				width={25}
				name="Search"
				fill="#682cbb"
			/>
		</View>
	)
}

export default Search;