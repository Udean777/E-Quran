import { View, Text } from "react-native";
import React from "react";
import { Searchbar, TextInput } from "react-native-paper";
import Fonts from "@/constants/Fonts";

const Search = () => {
  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        placeholder="Cari surah"
        value=""
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#b2b2b2",
        }}
        inputStyle={{ fontFamily: Fonts.medium }}
      />
    </View>
  );
};

export default Search;
