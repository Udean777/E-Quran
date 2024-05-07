import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {fetchDetailSurah} from '../fetch/fetchDetailSurah';
import {
  ActivityIndicator,
  Button,
  Divider,
  MD3Colors,
  Menu,
  TouchableRipple,
} from 'react-native-paper';
import {fetchTafsir} from '../fetch/fetchTafsir';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Detail = ({navigation}: any) => {
  const route: any = useRoute();
  const id = route.params.id;
  const {detailSurah, isLoading} = fetchDetailSurah(id);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {tafsirs, isLoadingTafsir} = fetchTafsir(id);
  const [tafsirData, setTafsirData] = useState<any>({});
  const [selectedAyat, setSelectedAyat] = useState<any>(null);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ['1%', '100%'], []);

  useEffect(() => {
    if (!isLoadingTafsir) {
      const tafsirByAyat: any = {};
      tafsirs.forEach((tafsir: any) => {
        const ayatNumber = tafsir.ayat;
        if (!tafsirByAyat[ayatNumber]) {
          tafsirByAyat[ayatNumber] = [];
        }
        tafsirByAyat[ayatNumber].push(tafsir.teks);
      });
      // console.log('Tafsir Data:', tafsirByAyat); // Tampilkan data tafsir di log
      setTafsirData(tafsirByAyat);
    }
  }, [isLoadingTafsir, tafsirs]);

  useMemo(() => {
    if (!isLoading) {
      setScrollEnabled(true);
    }
  }, [isLoading, detailSurah]);

  const openBottomSheet = (ayat: any) => {
    // console.log('Nomor Ayat:', ayat); // Tampilkan nomor ayat di console
    setSelectedAyat(ayat);
    bottomSheetRef.current?.expand();
  };

  // console.log(selectedAyat);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginTop: 10,
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#fff',
        }}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={'#000'} />
        </TouchableRipple>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Kumpulan Surah
        </Text>
        <View />
      </View>

      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#f29a00'} />
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

              <Text style={{color: '#f29a00', fontWeight: '400'}}>
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
                borderColor: '#f29a00',
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
            renderItem={({item, index}) => {
              return (
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

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                    <Button
                      mode="outlined"
                      textColor="#f29a00"
                      style={{flex: 1, borderColor: '#f29a00'}}
                      onPress={() => openBottomSheet(item.nomorAyat)}>
                      Tafsir
                    </Button>
                    <Button
                      mode="contained"
                      buttonColor="#f29a00"
                      textColor="#fff"
                      style={{flex: 1}}>
                      Audio
                    </Button>
                  </View>
                </View>
              );
            }}
          />
        </>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{borderRadius: 0}}
        handleIndicatorStyle={{display: 'none'}}
        backdropComponent={backdrop => (
          <BottomSheetBackdrop {...backdrop} enableTouchThrough />
        )}>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <Text
            style={{
              color: '#333',
              // marginBottom: 20,
              fontSize: 20,
              fontWeight: 'bold',
              borderLeftWidth: 2,
              paddingLeft: 10,
              borderColor: '#f29a00',
            }}>
            Tafsir {detailSurah?.namaLatin} Ayat {selectedAyat}
          </Text>

          <Divider style={{marginVertical: 10}} />

          {selectedAyat && tafsirData[selectedAyat] ? (
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              {tafsirData[selectedAyat].map(
                (tafsirText: string, index: number) => (
                  <Text key={index} style={{marginBottom: 10, color: '#333'}}>
                    {tafsirText}
                  </Text>
                ),
              )}
            </BottomSheetScrollView>
          ) : (
            <Text>No tafsir available</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default Detail;
