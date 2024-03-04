import {View, Text, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  MD3Colors,
  TouchableRipple,
} from 'react-native-paper';
import {fetchSurah} from '../fetch/fetchSurah';

const Home = ({navigation}: any) => {
  const {isLoading, surah} = fetchSurah();

  useMemo(() => {}, [surah]);

  // console.log(JSON.stringify(surah, null, 2))

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={MD3Colors.primary50} />
        </View>
      ) : (
        <FlatList
          data={surah}
          keyExtractor={index => index.nomor}
          renderItem={({item, index}) => {
            return (
              <TouchableRipple
                onPress={() => navigation.push('Detail', {id: item.nomor})}
                key={index}
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  padding: 20,
                  borderRadius: 10,
                  elevation: 2,
                  backgroundColor: '#fff',
                }}>
                <View>
                  <Text
                    style={{fontWeight: '900', fontSize: 17, color: '#333'}}>
                    {item.namaLatin}
                  </Text>

                  <Text
                    style={{fontWeight: '400', fontSize: 15, color: '#333'}}>
                    {item.arti} - {item.jumlahAyat}
                  </Text>
                </View>
              </TouchableRipple>
            );
          }}
        />
      )}
    </View>
  );
};

export default Home;
