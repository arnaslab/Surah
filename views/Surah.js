import React from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { AreaView } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSurah } from '../store/surah';

const themeColor = '#682cbb';

const Item = ({ data, onPress }) => (
  <TouchableOpacity 
    activeOpacity={0.7}
    onPress={onPress}
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
  </TouchableOpacity>
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
        <ScrollView style={{
          marginTop: 20,
          paddingLeft: 20,
          paddingRight: 20
        }}>
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
            }}>{surah.data.name}</Text>
            <Text style={{
              fontFamily: 'Acme-Regular',
              color: '#ffffff',
              fontSize: 25
            }}>{surah.data.englishName}</Text>
            <Text style={{
              color: '#ffffff'
            }}>{surah.data.englishNameTranslation}</Text>
          </View>
          <FlatList
            data={surah.data.ayahs}
            renderItem={({ index, item }) => <Item 
              index={index} 
              data={item}
              onPress={() => {}}
            />}
            keyExtractor={item => item.number}
          />
        </ScrollView>
      : surah.hasError ?
        <Text>{surah.error}</Text>
      :
        <Text>Loading...</Text>
      }
    </AreaView>
  );
}

export default Surah;
