import React from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { AreaView, Loader } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSurah } from '../store/surah';
import { themeColor, softColor } from './config';

const Header = ({ data }) => (
  <View style={{
    borderRadius: 20,
    backgroundColor: themeColor,
    display: 'flex',
    alignItems: 'center',
    padding: 20
  }}>
    <Text style={{
      fontFamily: 'Katibeh-Regular',
      color: '#ffffff',
      fontSize: 30
    }}>{data.name}</Text>
    <Text style={{
      fontFamily: 'Acme-Regular',
      color: '#ffffff',
      fontSize: 25
    }}>{data.englishName}</Text>
    <Text style={{
      color: '#ffffff'
    }}>{data.englishNameTranslation}</Text>
  </View>
)

const Item = ({ data, onPress }) => (
  <TouchableHighlight 
    activeOpacity={0.7}
    underlayColor={softColor}
    onPress={onPress}
    style={{ borderRadius: 15 }}
  >
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
    }}>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 25,
        height: 25,
        backgroundColor: themeColor
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: '#ffffff'
        }}>{data.numberInSurah}</Text>
      </View>
      <View style={{
          flexGrow: 1,
          flexDirection: 'row'
      }}>
        <Text style={{
          flex: 1, 
          flexWrap: 'wrap',
          fontFamily: 'Amiri-Regular',
          color: '#000000',
          fontSize: 25,
        }}>
          {data.text}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
)

const Surah = ({ navigation, route }) => {
  const { number } = route.params;
  const surah = useAppSelector(state => state.surah[number] || { status: 'idle' });
  const getSurah = useAppDispatch(fetchSurah);

  useEffect(() => {
    if (number && surah.isIdle) {
        getSurah(number);
    }
  }, [number])

  return (
    <AreaView color="#ffffff">
      {surah.isReady ?
        <FlatList
          style={{
            marginTop: 20,
            paddingHorizontal: 20
          }}
          data={surah.data.ayahs}
          renderItem={({ index, item }) => <Item 
            index={index} 
            data={item}
            onPress={() => navigation.navigate('Ayah', { number: item.number })}
          />}
          keyExtractor={item => item.number}
          ListHeaderComponent={() => <Header data={surah.data} />}
          // onEndReached={handleEndReached}
          // onEndReachedThreshold={.7}
        />
      : surah.hasError ?
        <Text>{surah.error}</Text>
      : <Loader fullScreen />
      }
    </AreaView>
  );
}

export default Surah;
