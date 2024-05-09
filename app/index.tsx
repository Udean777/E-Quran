import { View, Text, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import ListSurah from "./screens/components/ListSurah";
import { useNavigation } from "expo-router";
import api from "@/interceptor/apiInterceptor";
import BismillahCard from "./screens/components/BismillahCard";
import SearchBar from "./screens/components/Search";
import WelcomeCard from "./screens/components/WelcomeCard";

const Home = () => {
  const [surah, setSurah] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fethSurah = async () => {
    try {
      const res = await api.get("/surat");

      setIsLoading(false);
      setSurah(res.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fethSurah();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Kumpulan Surah</Text>
      </View>

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

          <ListSurah surah={surah} />
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
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});

export default memo(Home);
