import React from 'react';
import { View } from 'react-native';
import { AreaView } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAyah } from '../store/ayah';

const Page = ({ navigation, route }) => {
  const { number } = route.params;
  const ayah = useAppSelector(state => state.ayah[number] || { status: 'idle' });
  const getAyah = useAppDispatch(fetchAyah);

  useEffect(() => {
    if (number && ayah.isIdle) {
        getAyah(number);
    }
  }, [number])

  return (
    <AreaView color="#ffffff">
      {ayah.isReady &&
        <View>
          <Text>{ayah.data.text}</Text>
        </View>
      }
    </AreaView>
  );
}

export default Page;
