import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

const OptionModal = ({
  visible,
  onClose,
  currentItem,
  onPlayPress,
  onPlayListPress,
}) => {
  return (
    <>
      <Modal animationType="slide" visible={visible}>
        <View>
          <Text numberOfLines={2}>{currentItem.filename}</Text>
          <View>
            <TouchableOpacity onPress={onPlayPress}>
              <Text>play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayListPress}>
              <Text>Add to playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onClose}>
          <View>
            <Text>Hide</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default OptionModal;
const styles = StyleSheet.create({});
