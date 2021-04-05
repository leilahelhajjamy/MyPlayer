import React, { Component, createContext } from "react";
import { Alert, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();
class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      playbackObject: null,
      soundObject: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
    };
  }

  permissionAlert = () => {
    Alert.alert(
      "permission required",
      "this app nedds to acces your audio files",
      [
        {
          text: "am ready",
          onPress: () => {
            this.getPermission();
          },
        },
        {
          text: "cancel",
          onPress: () => {
            this.permissionAlert();
          },
        },
      ]
    );
  };
  getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    this.setState({
      ...this.state,
      audioFiles: media.assets,
    });
    console.log("audio passed", this.state.audioFiles);
  };
  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      this.getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } = MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        //display alert that the user must allow the app to acces their media library
      }
      if ((status = "granted")) {
        this.getAudioFiles();
      }
      if (status === "denied" && !canAskAgain) {
        //display alert that the user must allow the app to acces their media library
      }
    }
  };
  componentDidMount() {
    this.getPermission();
  }

  updateState = (prevState, newState) => {
    this.setState({ ...prevState, ...newState });
  };
  render() {
    const {
      audioFiles,
      permissionError,
      playbackObject,
      soundObject,
      currentAudio,
      isPlaying,
      currentAudioIndex,
    } = this.state;
    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          playbackObject,
          soundObject,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
