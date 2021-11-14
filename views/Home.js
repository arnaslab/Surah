import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { AreaView, Search } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMeta } from '../store/meta';
import { themeColor, lineColor, softColor } from './config';

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

  return (
    <AreaView color="#ffffff">
      <Search value={keyword} onChange={(value) => setKeyword(value)} />
      {meta.isReady ?
        <FlatList
          style={{
            paddingHorizontal: 20
          }}
          data={meta.data.surahs?.references}
          renderItem={({ index, item }) => <Item 
            index={index} 
            data={item} 
            onPress={() => navigation.navigate('Surah', { number: item.number })}
          />}
          keyExtractor={item => item.number}
        />
      : meta.hasError ?
        <Text>{meta.error}</Text>
      :
        <Text>Loading...</Text>
      }
    </AreaView>
  )
}

export default Home;