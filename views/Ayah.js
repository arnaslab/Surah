import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share, ScrollView } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { AreaView, Sound, Icon, Loader, IconButton } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAyah } from '../store/ayah';
import { themeColor, softColor, lineColor } from './config';

const onShare = async (message) => {
  try {
    await Share.share({ message });
  } catch (error) {
    alert(error.message);
  }
}

const Page = ({ data, isFirst, isLast, onNextAyah }) => {
  const [qoriIdx, setQoriIdx] = useState(0);
  const selectedQori = data?.qori[qoriIdx];

  return (
		<View style={{
			padding: 15,
			flex: 1
		}}>
			<ScrollView>
				<View style={{
					marginBottom: 10,
					padding: 10,
					borderRadius: 10,
					backgroundColor: softColor,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'row',
				}}>
					<Text style={{
						flexGrow: 1,
						fontSize: 18,
						fontWeight: 'bold',
						color: themeColor
					}}>{data.surah.englishName}: {data.numberInSurah}</Text>
					<IconButton 
						onPress={() => onShare(
							`*${data.surah.englishName}: ${data.numberInSurah}*\n\n` +
							`${data.text}\n\n` +
							`${data.translation}\n\n` +
							`${data.terjemah}`)}
						icon="Share" 
						color={themeColor} 
						size={20} 
					/>
				</View>
				<View style={{
					paddingHorizontal: 20,
					borderRadius: 20,
					borderColor: themeColor,
					borderWidth: 1
				}}>
					<Text style={{
						fontFamily: 'Amiri-Regular',
						color: '#000000',
						fontSize: 25,
					}}>
						{data.numberInSurah === 1 && ![1,9].includes(data.surah.number) ? data.text.substr(39) : data.text}
					</Text>
				</View>
				<Text style={{
					fontSize: 20,
					marginVertical: 10,
					borderBottomWidth: 1,
					borderBottomColor: lineColor,
					paddingBottom: 10,
				}}>
					{data.translation}
				</Text>
				<Text style={{
					fontSize: 20,
					marginVertical: 10,
					borderBottomWidth: 1,
					borderBottomColor: lineColor,
					paddingBottom: 10
				}}>
					{data.terjemah}
				</Text>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 20
				}}>
					<Text>{!isFirst && '<< swipe to prev ayah'}</Text>
					<Text>{!isLast && 'swipe to next ayah >>'}</Text>
				</View>
			</ScrollView>
			<View style={{
				padding: 10,
				borderRadius: 20,
				backgroundColor: softColor,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
			}}>
				<IconButton 
					icon="LeftArrow"
					color={themeColor}
					disabled={qoriIdx === 0} 
					onPress={() => setQoriIdx(idx => idx - 1)}
				/>
				<View style={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center'
				}}>
					<Text style={{ marginBottom: 5 }}>{selectedQori.englishName}</Text>
					<Sound 
						url={selectedQori.audio}
						// onPlayEnd={onNextAyah}
						Component={({ isReady, isPlay, onPlay, onStop}) => (
							isReady ?
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={isPlay ? () => {} : onPlay}
								>
									<View style={{
										borderRadius: 50,
										width: 60,
										height: 60,
										backgroundColor: themeColor,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}>
										<Icon 
											style={{
												marginLeft: 5
											}}
											name={isPlay ? "Pause" : "Play"} 
											fill="#ffffff" 
											width={15} 
											height={15} 
										/>
									</View>
								</TouchableOpacity>
							: <Loader size={80} />
						)}
					/>
				</View>
				<IconButton 
					icon="LeftArrow" 
					color={themeColor}
					style={{ transform: [{ rotate: '180deg' }] }}
					disabled={qoriIdx === data.qori.length - 1} 
					onPress={() => setQoriIdx(idx => idx + 1)}
				/>
			</View>
		</View>
  );
}

const Ayah = ({ navigation, route }) => {
  const { number } = route.params;
	const [ayahNum, setAyahNum] = useState(number);
	const meta = useAppSelector(state => state.meta);
	const ayah = useAppSelector(state => state.ayah[ayahNum] || { status: 'idle' });
  const getAyah = useAppDispatch(fetchAyah);

	useEffect(() => {
    if (ayahNum && ayah.isIdle) {
      getAyah(ayahNum);
    }
  }, [ayahNum])

	const handleNextAyah = () => {
		if (ayahNum < meta.data?.ayahs.count) {
			setAyahNum(num => num + 1);
		}
	}

	const handlePrevAyah = () => {
		if (ayahNum > 1) {
			setAyahNum(num => num - 1);
		}
	}

	return (
		<AreaView color="#ffffff">
			<GestureRecognizer
        onSwipeLeft={(state) => handleNextAyah(state)}
        onSwipeRight={(state) => handlePrevAyah(state)}
        config={{
					velocityThreshold: 0.3,
		      directionalOffsetThreshold: 80
				}}
        style={{
          flex: 1,
        }}
      >
				{ayah.isReady 
					? <Page 
						data={ayah.data} 
						onNextAyah={handleNextAyah} 
						isFirst={ayahNum === 1}
						isLast={ayahNum === meta.data?.ayahs.count}
					/>
					: <Loader fullScreen />
				}
			</GestureRecognizer>
		</AreaView>
	)
}

export default Ayah;
