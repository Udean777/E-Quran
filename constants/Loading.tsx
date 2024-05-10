import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={"large"}
        color={"#f29a00"}
      />
    </View>
  );
};

export default Loading;
