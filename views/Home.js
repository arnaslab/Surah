import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { AreaView, Search, EightPointBurst } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMeta } from '../store/meta';
import { themeColor, lineColor, softColor, version } from './config';

const Item = ({ data, onPress }) => (
  <TouchableHighlight 
    activeOpacity={0.7}
    underlayColor={softColor}
    onPress={onPress}
  >
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomColor: lineColor,
      borderBottomWidth: 1
    }}>
      <EightPointBurst 
        size={30}
        color={themeColor}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10
        }}
      >
        <Text style={{
          color: themeColor,
          fontWeight: 'bold'
        }}>{data.number}</Text>
      </EightPointBurst>
      <View style={{
        flexGrow: 1,
        marginLeft: 10
      }}>
        <Text style={{ 
          color: themeColor,
          fontSize: 16,
          fontWeight: 'bold' 
        }}>{data.englishName}</Text>
        <Text style={{ 
          color: themeColor 
        }}>{data.revelationType} {'\u25CF'} {data.numberOfAyahs} verses</Text>
      </View>
      <Text style={{
        fontFamily: 'Katibeh-Regular',
        color: themeColor,
        fontSize: 30
      }}>{data.name.replace("سُورَةُ ", "")}</Text>
    </View>
  </TouchableHighlight>
);

const Home = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const meta = useAppSelector(state => state.meta);
  const getMeta = useAppDispatch(fetchMeta);

  useEffect(() => {
    if (meta.isIdle) {
      getMeta();
    }
  }, [])

  useEffect(() => {
    if (meta.isReady || meta.hasError) {
      SplashScreen.hide();
    }
  }, [meta.isReady, meta.hasError]);

  const filterSurah = (data) => {
    if (data && keyword.length > 0) {
      return data.filter(_ => _.englishName.toLowerCase().includes(keyword.toLowerCase()))
    } else {
      return data;
    }
  }

  return (
    <AreaView color="#ffffff">
      <Search value={keyword} onChange={(value) => setKeyword(value)} />
      {meta.isReady &&
        <FlatList
          style={{
            paddingHorizontal: 20
          }}
          data={filterSurah(meta.data.surahs?.references)}
          renderItem={({ index, item }) => <Item 
            index={index} 
            data={item} 
            onPress={() => navigation.navigate('Surah', { number: item.number })}
          />}
          keyExtractor={item => item.number}
          ListFooterComponent={() => (
            <View style={{
              display: 'flex',
              alignItems: 'center',
              padding: 10
            }}>
              <Text>Version {version}</Text>
            </View>
          )}
        />
      }
    </AreaView>
  )
}

export default Home;