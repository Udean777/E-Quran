import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { memo } from "react";
import { Link, useNavigation, useRouter } from "expo-router";

const ListSurah = ({ surah }: { navigation: any; surah: any }) => {
  const router = useRouter();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {surah.map((item: any, index: any) => (
        <View key={item.nomor}>
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/screens/[detail]",
                params: { detail: item.nomor },
              })
            }
            style={styles.container}>
            <View style={styles.container2}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}>
                <View style={styles.numCircle}>
                  <Text
                    style={{
                      color: "#333",
                      fontWeight: "400",
                      fontSize: 20,
                    }}>
                    {item.nomor}
                  </Text>
                </View>

                <View style={{ width: 200 }}>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: 17,
                      color: "#333",
                    }}>
                    {item.namaLatin}
                  </Text>

                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 15,
                      color: "#f29a00",
                    }}>
                    {item.tempatTurun} - {item.arti}
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <Text
                  style={{
                    color: "#333",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}>
                  {item.nama}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
  },
  container2: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  numCircle: {
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#f29a00",
  },
});

export default memo(ListSurah);
