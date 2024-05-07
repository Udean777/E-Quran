import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ListDetailSurah = ({
  styles,
  detailSurah,
  openBottomSheet,
  playSound,
  isPlaying,
}: {
  styles: any;
  detailSurah: any;
  openBottomSheet: any;
  playSound: any;
  isPlaying: any;
}) => {
  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleIsPlaying = (nomorAyat: any) => {
    setIsPlayingMap((prevPlayingMap: any) => ({
      ...prevPlayingMap,
      [nomorAyat]: !prevPlayingMap[nomorAyat],
    }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {detailSurah.ayat.map((surah: any, index: any) => (
        <View
          style={styles.cardContainer}
          key={surah.nomorAyat}>
          <View style={styles.cardTitle}>
            <Text style={{ color: "#333" }}>
              {detailSurah.nomor}:{surah.nomorAyat}
            </Text>
          </View>

          <Text style={styles.teksArab}>{surah.teksArab}</Text>

          <View style={{ gap: 10 }}>
            <Text style={{ color: "#f29a00" }}>{surah.teksLatin}</Text>
            <Text style={{ color: "#333" }}>{surah.teksIndonesia}</Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              textColor="#f29a00"
              style={{ flex: 1, borderColor: "#f29a00" }}
              onPress={() => openBottomSheet(surah.nomorAyat)}>
              Tafsir
            </Button>
            <Button
              mode="contained"
              buttonColor="#f29a00"
              textColor="#fff"
              onPress={() => {
                playSound(surah.audio["02"]);
                toggleIsPlaying(surah.nomorAyat);
              }}
              style={{ flex: 1 }}>
              <Ionicons
                name={isPlayingMap[surah.nomorAyat] ? "stop" : "play"} // Sesuaikan ikon berdasarkan status isPlaying
                size={20}
              />
            </Button>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListDetailSurah;
