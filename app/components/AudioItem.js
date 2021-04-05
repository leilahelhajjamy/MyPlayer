import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Modal,
  TouchableHighlight,
  TouchableOpacityBase,
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
const renderPlayPauseIcon = (isPlaying) => {
  if (isPlaying) {
    return <Entypo name="controller-paus" size={24} color="black" />; // play icon
  } else {
    return <Entypo name="controller-play" size={24} color="black" />; // pause icon
  }
};
const renderNoteIcon = () => {
  return <Entypo name="note" size={24} color="black" />;
};
function AudioItem({
  item,
  onOptionPress,
  onAudioPress,
  selectedItem,
  isPlaying,
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
      const sec = Math.floor((60 * percent) / 100);

      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }

      if (sec < 10) {
        return `${minute}:0${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };
  return (
    <>
      <TouchableOpacity onPress={onAudioPress}>
        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.iconContainer}>
              {selectedItem ? renderPlayPauseIcon(isPlaying) : renderNoteIcon()}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{item.filename}</Text>
              <Text style={styles.textSubtitle}>
                {convertTime(item.duration)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Entypo
        onPress={onOptionPress}
        name="dots-three-vertical"
        size={20}
        color="#000000"
      />
      <View style={styles.barDivider}></View>
    </>
  );
}

export default AudioItem;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#f2f6e6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  textTitle: {
    color: "#77a03e",
    marginLeft: 10,
    marginBottom: 2,
  },
  textSubtitle: {
    color: "#acc640",
    marginLeft: 10,
    marginBottom: 2,
  },

  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "55%",
    alignSelf: "flex-start",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  barDivider: {
    backgroundColor: "#acc640",
    width: "80%",
    height: 1,
    alignSelf: "center",
  },
});
