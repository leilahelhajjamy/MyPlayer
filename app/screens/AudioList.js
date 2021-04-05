import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  LayoutAnimation,
  Dimensions,
  NativeModules,
} from "react-native";
import { AudioContext } from "../context/AudioProvider";
import AudioItem from "../components/AudioItem";
import OptionModal from "../components/OptionModal";
import { play, pause, resume, playNext } from "../music/audioController";

import { Audio } from "expo-av";
const { StatusBarManager } = NativeModules;

export class AudioList extends Component {
  static contextType = AudioContext;
  constructor(props) {
    super(props);
    this.state = {
      OptionModalvisible: false,
    };
    this.currentItem = {};
  }
  handleAudioPress = async (audio) => {
    const {
      soundObject,
      playbackObject,
      currentAudio,
      updateState,
      audioFiles,
    } = this.context;
    //playing audio for the first time
    if (soundObject === null) {
      const playbackObject = new Audio.Sound();
      const status = await play(playbackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        playbackObject: playbackObject,

        soundObject: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }
    //pause audio
    if (
      soundObject.isLoaded &&
      soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObject);
      return updateState(this.context, {
        soundObject: status,
        isPlaying: false,
      });
    }
    //resume
    if (
      soundObject.isLoaded &&
      !soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObject);
      return updateState(this.context, {
        soundObject: status,
        isPlaying: true,
      });
    }
    //play other
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        soundObject: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }
  };

  renderAudioItem = ({ item, index }) => {
    return (
      <AudioItem
        item={item}
        selectedItem={this.context.currentAudioIndex === index}
        isPlaying={this.context.isPlaying}
        onAudioPress={() => {
          this.handleAudioPress(item);
        }}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, OptionModalvisible: true });
        }}
      />
    );
  };

  render() {
    return (
      <View styles={styles.container}>
        <FlatList
          style={{ marginLeft: 16 }}
          data={this.context.audioFiles}
          renderItem={this.renderAudioItem}
          keyExtractor={(item) => item.id}
        />
        <OptionModal
          onPlayListPress={() => {
            console.log("playList pressed");
          }}
          onPlayPress={() => {
            console.log("play pressed");
          }}
          currentItem={this.currentItem}
          onClose={() => {
            this.setState({ ...this.state, OptionModalvisible: false });
          }}
          visible={this.state.OptionModalvisible}
        />
      </View>
    );
  }
}

export default AudioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBarManager.HEIGHT,
  },
});
