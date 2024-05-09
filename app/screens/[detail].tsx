import { View, Text, StyleSheet } from "react-native";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheetComp from "./components/BottomSheet";
import ListDetailSurah from "./components/ListDetailSurah";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Audio } from "expo-av";
import useDetailStore from "@/zustand/store";

const Detail = () => {
  const { detail } = useLocalSearchParams<{ detail: any }>();
  const {
    detailSurah,
    fetchDetailSurah,
    fetchTafsirs,
    isLoading,
    isLoadingTafsir,
    isPlaying,
    selectedAyat,
    setIsPlaying,
    setSound,
    sound,
    tafsirData,
    tafsirs,
    setTafsirData,
  } = useDetailStore();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ["1%", "100%"], []);

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
      setTafsirData(tafsirByAyat);
    }
  }, [isLoadingTafsir, tafsirs]);

  const openBottomSheet = (ayat: any) => {
    useDetailStore.setState({ selectedAyat: ayat });
    bottomSheetRef.current?.expand();
  };

  const playSound = async (audio: any) => {
    try {
      if (isPlaying && sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audio,
        });

        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    fetchDetailSurah(detail);
    fetchTafsirs(detail);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={"#000"}
          />
        </TouchableRipple>
        <Text style={styles.headerTitle}>{detailSurah?.namaLatin}</Text>
        <View />
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size={"large"}
            color={"#f29a00"}
          />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 17, color: "#333", fontWeight: "900" }}>
                {detailSurah.namaLatin} - {detailSurah.nama}
              </Text>

              <Text style={{ color: "#f29a00", fontWeight: "400" }}>
                {detailSurah.arti} - {detailSurah.jumlahAyat} -{" "}
                {detailSurah.tempatTurun}
              </Text>
            </View>

            <View style={styles.nomorSurahContainer}>
              <Text
                style={{
                  color: "#333",
                  fontWeight: "400",
                  fontSize: 20,
                }}>
                {detailSurah.nomor}
              </Text>
            </View>
          </View>

          <ListDetailSurah
            detailSurah={detailSurah}
            openBottomSheet={openBottomSheet}
            styles={styles}
            playSound={playSound}
            isPlaying={isPlaying}
          />
        </>
      )}

      <BottomSheetComp
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        detailSurah={detailSurah}
        selectedAyat={selectedAyat}
        styles={styles}
        tafsirData={tafsirData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nomorSurahContainer: {
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#f29a00",
  },
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderLeftWidth: 2,
    borderColor: "#f29a00",
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    gap: 10,
  },
  textTafsir: {
    color: "#333",
    // marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    borderLeftWidth: 2,
    paddingLeft: 10,
    borderColor: "#f29a00",
  },
  teksArab: {
    color: "#333",
    fontSize: 17,
    fontWeight: "900",
    width: 250,
    alignSelf: "flex-end",
    marginVertical: 20,
  },
});

export default memo(Detail);
