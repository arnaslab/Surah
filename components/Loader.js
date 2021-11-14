import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLoader from "react-native-animated-loader";

const Loader = ({ fullScreen = false, size = 150 }) => {

	const animation = (
		<LottieView 
			source={require('./lottie/66433-loader.json')} 
			autoPlay 
			loop 
			style={{
				width: size,
				height: size
			}}
			colorFilters={[
				{ nm: '#dot03', color: '#ffffff' }
			]}
		/>
	)

	if (fullScreen) {
		return (
			<View style={{
				flex: 1, 
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				{animation}
			</View>
		)
	} else {
		return animation;
	}
}

export default Loader;