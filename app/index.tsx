import { View, Text, StyleSheet } from "react-native";
import React, { memo, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import ListSurah from "./screens/components/ListSurah";
import SearchBar from "./screens/components/Search";
import WelcomeCard from "./screens/components/WelcomeCard";
import { useSurahStore } from "@/zustand/store";
import Fonts from "@/constants/Fonts";

const Home = () => {
  const { isLoading, fetchSurah } = useSurahStore();

  useEffect(() => {
    fetchSurah();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Kumpulan Surah</Text>
      </View> */}

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={"#f29a00"}
          />
        </View>
      ) : (
        <>
          <WelcomeCard />

          <SearchBar />

          <ListSurah />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    // marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: "#000",
    textAlign: "center",
  },
});

export default memo(Home);
