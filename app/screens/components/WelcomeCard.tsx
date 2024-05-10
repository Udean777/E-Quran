import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import Fonts from "@/constants/Fonts";

const WelcomeCard = () => {
  const dateNow = format(new Date(), "yyyy MM dd");
  const dayNow = format(new Date(), "'Today is' eeee");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
      </Text>

      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 20,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          borderColor: "#fff",
        }}>
        <Text style={styles.textDay}>{dayNow}</Text>
        <Text style={styles.textDay}>{dateNow}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f29a00",
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    fontFamily: Fonts.bold,
  },
  textDay: { color: "#fff", fontFamily: Fonts.bold },
});

export default WelcomeCard;
