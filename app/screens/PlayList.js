import React from "react";
import { StyleSheet, View, Text } from "react-native";
function PlayList(props) {
  return (
    <View style={styles.container}>
      <Text>PlayList</Text>
    </View>
  );
}

export default PlayList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
