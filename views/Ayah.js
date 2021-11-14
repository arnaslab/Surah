import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { AreaView, Sound, Icon, Loader, TransparentButton } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAyah } from '../store/ayah';
import { themeColor, softColor } from './config';

const onShare = async (message) => {
  try {
    await Share.share({ message });
  } catch (error) {
    alert(error.message);
  }
}

const Ayah = ({ navigation, route }) => {
  const { number } = route.params;
  const ayah = useAppSelector(state => state.ayah[number] || { status: 'idle' });
  const getAyah = useAppDispatch(fetchAyah);
  const [qoriIdx, setQoriIdx] = useState(0);

  useEffect(() => {
    if (number && ayah.isIdle) {
      console.log("ayah number", number);
      getAyah(number);
    }
  }, [number])

  useEffect(() => {
    console.log("ayah", ayah.data?.qori);
  }, [ayah.isReady, ayah.isFetching, ayah.hasError])

  const data = ayah.data;
  const selectedQori = data?.qori[qoriIdx];

  console.log("selectedQori", qoriIdx, selectedQori);

  return (
    <AreaView color="#ffffff">
      {ayah.isReady ?
        <View style={{
          padding: 15
        }}>
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
              flexGrow: 1
            }}>{data.surah.englishName}: {data.numberInSurah}</Text>
            <TransparentButton 
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
              {data.text}
            </Text>
          </View>
          <Text style={{
            fontSize: 20,
            marginVertical: 10
          }}>
            {data.translation}
          </Text>
          <Text style={{
            fontSize: 20,
            marginVertical: 10
          }}>
            {data.terjemah}
          </Text>
          <View style={{
            padding: 10,
            borderRadius: 20,
            backgroundColor: softColor,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <TransparentButton 
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
                Component={({ isReady, isPlay, onPlay, onPause}) => (
                  isReady ?
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={isPlay ? onPause : onPlay}
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
            <TransparentButton 
              icon="LeftArrow" 
              color={themeColor}
              style={{ transform: [{ rotate: '180deg' }] }}
              disabled={qoriIdx === data.qori.length - 1} 
              onPress={() => setQoriIdx(idx => idx + 1)}
            />
          </View>
        </View>
        : <Loader fullScreen />
      }
    </AreaView>
  );
}

export default Ayah;
