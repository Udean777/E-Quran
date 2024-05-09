import { View, Text } from "react-native";
import React from "react";
import { Searchbar, TextInput } from "react-native-paper";

const Search = () => {
  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        placeholder="Cari surah"
        value=""
        style={{ backgroundColor: "#fff" }}
      />
    </View>
  );
};

export default Search;
