import {
  View,
  Text,
  FlatList,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {fetchDetailSurah} from '../fetch/fetchDetailSurah';
import {ActivityIndicator, MD3Colors, Menu} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const Detail = ({navigation}: any) => {
  const route: any = useRoute();
  const id = route.params.id;
  const {detailSurah, isLoading} = fetchDetailSurah(id);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [menuVisible, setMenuVisible] = useState<{[key: string]: boolean}>({});
  const selectedItemId = useRef<any>(null);

  const openMenu = (id: string) => {
    setMenuVisible(prevState => ({
      ...prevState,
      [id]: true,
    }));
    selectedItemId.current = id;
  };

  const closeMenu = (id: string) => {
    setMenuVisible(prevState => ({
      ...prevState,
      [id]: false,
    }));
    selectedItemId.current = null;
  };

  useMemo(() => {
    if (!isLoading) {
      setScrollEnabled(true);
    }
  }, [isLoading, detailSurah]);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={MD3Colors.primary50} />
        </View>
      ) : (
        <>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 20,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 17, color: '#333', fontWeight: '900'}}>
                {detailSurah.namaLatin} - {detailSurah.nama}
              </Text>

              <Text style={{color: '#333', fontWeight: '400'}}>
                {detailSurah.arti} - {detailSurah.jumlahAyat} -{' '}
                {detailSurah.tempatTurun}
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: '#333',
                  fontWeight: '400',
                  fontSize: 20,
                }}>
                {detailSurah.nomor}
              </Text>
            </View>
          </View>

          <FlatList
            data={detailSurah.ayat}
            keyExtractor={item => item.nomorAyat}
            scrollEnabled={scrollEnabled}
            renderItem={({item, index}) => (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                  padding: 20,
                  borderRadius: 10,
                  elevation: 2,
                  backgroundColor: '#fff',
                  borderLeftWidth: 2,
                  borderColor: MD3Colors.neutralVariant50,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#333'}}>
                    {detailSurah.nomor}:{item.nomorAyat}
                  </Text>

                  <Menu
                    visible={menuVisible[item.nomorAyat]}
                    onDismiss={() => closeMenu(item.nomorAyat)}
                    anchor={
                      <Entypo
                        name="dots-three-vertical"
                        size={15}
                        color="#000"
                        onPress={() => openMenu(item.nomorAyat)}
                      />
                    }
                    contentStyle={{backgroundColor: '#fff'}}>
                    <Menu.Item
                      onPress={() => navigation.push('Tafsir')}
                      leadingIcon={'clipboard-text-search-outline'}
                      title="Tafsir"
                      titleStyle={{color: '#333'}}
                    />
                  </Menu>
                </View>

                <Text
                  style={{
                    color: '#333',
                    fontSize: 17,
                    fontWeight: '900',
                    width: 250,
                    alignSelf: 'flex-end',
                    marginVertical: 20,
                  }}>
                  {item.teksArab}
                </Text>

                <View style={{gap: 10}}>
                  <Text style={{color: '#f29a00'}}>{item.teksLatin}</Text>
                  <Text style={{color: '#333'}}>{item.teksIndonesia}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Detail;
