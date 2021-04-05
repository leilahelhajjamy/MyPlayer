import React from "react";
import { StyleSheet, View, Text } from "react-native";
function Player(props) {
  return (
    <View style={styles.container}>
      <Text>player</Text>
    </View>
  );
}

export default Player;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
