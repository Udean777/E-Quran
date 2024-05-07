import { View, Text, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  MD3Colors,
  TouchableRipple,
} from 'react-native-paper';
import { fetchSurah } from '../fetch/fetchSurah';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }: any) => {
  const { isLoading, surah } = fetchSurah();

  useMemo(() => { }, [surah]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // flexDirection: "row",
          justifyContent: 'center',
          // marginTop: 10,
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
          }}>
          Kumpulan Surah
        </Text>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#f29a00'} />
        </View>
      ) : (
        <FlatList
          data={surah}
          keyExtractor={index => index.nomor}
          renderItem={({ item, index }) => {
            return (
              <TouchableRipple
                onPress={() => navigation.navigate('Detail', { id: item.nomor })}
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
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
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
                        {item.nomor}
                      </Text>
                    </View>

                    <View style={{ width: 200 }}>
                      <Text
                        style={{
                          fontWeight: '900',
                          fontSize: 17,
                          color: '#333',
                        }}>
                        {item.namaLatin}
                      </Text>

                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 15,
                          color: '#f29a00',
                        }}>
                        {item.tempatTurun} - {item.arti}
                      </Text>
                    </View>
                  </View>

                  <View style={{}}>
                    <Text
                      style={{
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {item.nama}
                    </Text>
                  </View>
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
