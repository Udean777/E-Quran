import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { fetchSurah } from "./fetch/fetchSurah";
import ListSurah from "./screens/components/ListSurah";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const { isLoading, surah } = fetchSurah();

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
        <ListSurah
          navigation={navigation}
          surah={surah}
        />
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
